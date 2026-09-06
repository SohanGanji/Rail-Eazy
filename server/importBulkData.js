require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Station = mongoose.model('Station', new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, default: '' },
  zone: { type: String, default: 'IR' }
}));

const Train = mongoose.model('Train', new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  trainName: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, default: '00:00' },
  arrivalTime: { type: String, default: '00:00' },
  duration: { type: String, default: '12h 00m' },
  durationMinutes: { type: Number, default: 720 },
  daysOfOperation: { type: [String], default: ['Daily'] },
  classes: { type: [String], default: ['SL', '3A', '2A'] },
  fares: {
    SL: { type: Number, default: 380 },
    '3A': { type: Number, default: 1020 },
    '2A': { type: Number, default: 1480 },
    '1A': { type: Number, default: 2500 },
    CC: { type: Number, default: 850 }
  },
  stops: [{
    stationCode: String,
    stationName: String,
    arrivalTime: String,
    departureTime: String,
    dayOffset: Number
  }]
}));

async function runImport() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const dataDir = path.join(__dirname, 'data');
    const files = fs.readdirSync(dataDir);
    console.log('Detected files in data directory:', files);

    // 1. Process Stations
    const stationsFile = files.find(f => f.toLowerCase().includes('station'));
    if (stationsFile) {
      console.log(`Loading stations from ${stationsFile}...`);
      const raw = JSON.parse(fs.readFileSync(path.join(dataDir, stationsFile), 'utf-8'));
      const items = Array.isArray(raw) ? raw : (raw.features || Object.values(raw));

      const stationDocs = items.map(s => {
        const p = s.properties || s;
        return {
          code: String(p.code || p.station_code || p.StationCode || '').trim().toUpperCase(),
          name: String(p.name || p.station_name || p.StationName || '').trim(),
          city: String(p.state || p.city || p.name || '').trim(),
          zone: String(p.zone || 'IR').trim()
        };
      }).filter(s => s.code && s.name);

      const uniqueStations = Array.from(new Map(stationDocs.map(st => [st.code, st])).values());

      console.log(`Writing ${uniqueStations.length} stations in batches...`);
      const batchSize = 1000;
      for (let i = 0; i < uniqueStations.length; i += batchSize) {
        const batch = uniqueStations.slice(i, i + batchSize);
        await Station.bulkWrite(
          batch.map(st => ({
            updateOne: {
              filter: { code: st.code },
              update: { $set: st },
              upsert: true
            }
          }))
        );
      }
      console.log('Stations imported successfully!');
    }

    // 2. Process Schedules (if separate)
    const schedulesFile = files.find(f => f.toLowerCase().includes('schedule'));
    const scheduleMap = new Map();
    if (schedulesFile) {
      console.log(`Mapping schedules from ${schedulesFile}...`);
      const raw = JSON.parse(fs.readFileSync(path.join(dataDir, schedulesFile), 'utf-8'));
      const items = Array.isArray(raw) ? raw : (raw.features || Object.values(raw));

      for (const st of items) {
        const p = st.properties || st;
        const num = String(p.train_number || p.trainNumber || p.TrainNo || '').trim();
        if (!scheduleMap.has(num)) scheduleMap.set(num, []);
        scheduleMap.get(num).push({
          stationCode: String(p.station_code || p.stationCode || p.StationCode || '').trim().toUpperCase(),
          stationName: String(p.station_name || p.stationName || '').trim(),
          arrivalTime: String(p.arrival || p.arrivalTime || 'None').trim(),
          departureTime: String(p.departure || p.departureTime || 'None').trim(),
          dayOffset: Number(p.day || 0)
        });
      }
    }

    // 3. Process Trains
    const trainsFile = files.find(f => f.toLowerCase().includes('train'));
    if (trainsFile) {
      console.log(`Loading trains from ${trainsFile}...`);
      const raw = JSON.parse(fs.readFileSync(path.join(dataDir, trainsFile), 'utf-8'));
      const items = Array.isArray(raw) ? raw : (raw.features || Object.values(raw));

      const trainDocs = items.map(t => {
        const p = t.properties || t;
        const num = String(p.number || p.train_number || p.trainNumber || p.TrainNo || '').trim();
        const origin = String(p.from_station_code || p.from || p.origin || p.Source || '').trim().toUpperCase();
        const dest = String(p.to_station_code || p.to || p.destination || p.Destination || '').trim().toUpperCase();

        return {
          trainNumber: num,
          trainName: String(p.name || p.train_name || p.TrainName || 'Express').trim(),
          origin: origin,
          destination: dest,
          departureTime: String(p.departure || p.from_time || '08:00').trim(),
          arrivalTime: String(p.arrival || p.to_time || '20:00').trim(),
          stops: scheduleMap.get(num) || p.stops || []
        };
      }).filter(t => t.trainNumber && t.origin && t.destination);

      const uniqueTrains = Array.from(new Map(trainDocs.map(tr => [tr.trainNumber, tr])).values());

      console.log(`Writing ${uniqueTrains.length} trains in batches...`);
      const batchSize = 500;
      for (let i = 0; i < uniqueTrains.length; i += batchSize) {
        const batch = uniqueTrains.slice(i, i + batchSize);
        await Train.bulkWrite(
          batch.map(tr => ({
            updateOne: {
              filter: { trainNumber: tr.trainNumber },
              update: { $set: tr },
              upsert: true
            }
          }))
        );
        console.log(`Stored ${Math.min(i + batchSize, uniqueTrains.length)} of ${uniqueTrains.length} trains...`);
      }
      console.log('Trains imported successfully!');
    }

    console.log('All dataset JSON files successfully synced to MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('Import error:', err);
    process.exit(1);
  }
}

runImport();
