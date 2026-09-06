require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Station = mongoose.model('Station', new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, default: '' },
  zone: { type: String, default: '' }
}));

const Train = mongoose.model('Train', new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  trainName: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, default: '00:00' },
  arrivalTime: { type: String, default: '00:00' },
  duration: { type: String, default: '' },
  durationMinutes: { type: Number, default: 0 },
  daysOfOperation: { type: [String], default: ['Daily'] },
  classes: { type: [String], default: ['SL', '3A', '2A'] },
  fares: {
    SL: { type: Number, default: 350 },
    '3A': { type: Number, default: 950 },
    '2A': { type: Number, default: 1400 },
    '1A': { type: Number, default: 2400 },
    CC: { type: Number, default: 850 }
  },
  stops: [{
    stationCode: String,
    stationName: String,
    arrivalTime: String,
    departureTime: String,
    haltMinutes: Number,
    dayOffset: Number
  }]
}));

async function runImport() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const dataDir = path.join(__dirname, 'data');
    const stationsPath = path.join(dataDir, 'stations.json');
    const trainsPath = path.join(dataDir, 'trains.json');
    const schedulesPath = path.join(dataDir, 'schedules.json');

    // 1. IMPORT STATIONS
    if (fs.existsSync(stationsPath)) {
      console.log('Reading stations.json...');
      const rawStations = JSON.parse(fs.readFileSync(stationsPath, 'utf-8'));
      const stationsList = (rawStations.features || rawStations).map((s) => {
        const p = s.properties || s;
        return {
          code: (p.code || p.station_code || '').trim().toUpperCase(),
          name: (p.name || p.station_name || '').trim(),
          city: (p.state || p.city || p.name || '').trim(),
          zone: (p.zone || 'IR').trim()
        };
      }).filter((s) => s.code && s.name);

      // Deduplicate by station code to ensure bulkWrite upsert safety
      const uniqueStationsMap = new Map();
      for (const st of stationsList) {
        if (!uniqueStationsMap.has(st.code)) {
          uniqueStationsMap.set(st.code, st);
        }
      }
      const uniqueStations = Array.from(uniqueStationsMap.values());

      console.log(`Preparing to write ${uniqueStations.length} stations...`);
      const stationChunkSize = 1000;
      for (let i = 0; i < uniqueStations.length; i += stationChunkSize) {
        const chunk = uniqueStations.slice(i, i + stationChunkSize);
        await Station.bulkWrite(
          chunk.map((st) => ({
            updateOne: {
              filter: { code: st.code },
              update: { $set: st },
              upsert: true
            }
          }))
        );
      }
      console.log('Stations successfully imported!');
    }

    // 2. READ SCHEDULES (if available)
    const scheduleMap = new Map();
    if (fs.existsSync(schedulesPath)) {
      console.log('Mapping schedules (this may take a few seconds)...');
      const rawSchedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf-8'));
      for (const stop of rawSchedules) {
        const trainNum = String(stop.train_number || stop.trainNumber).trim();
        if (!scheduleMap.has(trainNum)) {
          scheduleMap.set(trainNum, []);
        }
        scheduleMap.get(trainNum).push({
          stationCode: (stop.station_code || stop.stationCode || '').trim().toUpperCase(),
          stationName: stop.station_name || stop.stationName || '',
          arrivalTime: stop.arrival || stop.arrivalTime || 'None',
          departureTime: stop.departure || stop.departureTime || 'None',
          dayOffset: stop.day || 0
        });
      }
    }

    // 3. IMPORT TRAINS
    if (fs.existsSync(trainsPath)) {
      console.log('Reading trains.json...');
      const rawTrains = JSON.parse(fs.readFileSync(trainsPath, 'utf-8'));
      const trainsList = (rawTrains.features || rawTrains).map((t) => {
        const p = t.properties || t;
        const trainNum = String(p.number || p.train_number || p.trainNumber || '').trim();
        const originCode = (p.from_station_code || p.origin || '').trim().toUpperCase();
        const destCode = (p.to_station_code || p.destination || '').trim().toUpperCase();
        const durationHours = p.duration_h || Math.floor((p.duration_m || 0) / 60) || 12;

        return {
          trainNumber: trainNum,
          trainName: (p.name || p.train_name || 'Express').trim(),
          origin: originCode,
          destination: destCode,
          departureTime: p.departure || '08:00',
          arrivalTime: p.arrival || '20:00',
          duration: `${durationHours}h 00m`,
          durationMinutes: durationHours * 60,
          stops: scheduleMap.get(trainNum) || []
        };
      }).filter((t) => t.trainNumber && t.origin && t.destination);

      // Deduplicate trains by trainNumber
      const uniqueTrainsMap = new Map();
      for (const tr of trainsList) {
        if (!uniqueTrainsMap.has(tr.trainNumber)) {
          uniqueTrainsMap.set(tr.trainNumber, tr);
        }
      }
      const uniqueTrains = Array.from(uniqueTrainsMap.values());

      console.log(`Preparing to write ${uniqueTrains.length} trains...`);
      
      // Batch in chunks of 500 for high efficiency
      const chunkSize = 500;
      for (let i = 0; i < uniqueTrains.length; i += chunkSize) {
        const chunk = uniqueTrains.slice(i, i + chunkSize);
        await Train.bulkWrite(
          chunk.map((tr) => ({
            updateOne: {
              filter: { trainNumber: tr.trainNumber },
              update: { $set: tr },
              upsert: true
            }
          }))
        );
        console.log(`Saved trains ${i + 1} to ${Math.min(i + chunkSize, uniqueTrains.length)}...`);
      }
      console.log('Trains successfully imported!');
    }

    console.log('Whole dataset imported directly into MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('Import failed:', err);
    process.exit(1);
  }
}

runImport();
