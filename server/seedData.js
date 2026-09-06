require('dotenv').config();
const mongoose = require('mongoose');

const Station = mongoose.model('Station', new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  zone: { type: String, required: true }
}));

const Train = mongoose.model('Train', new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  trainName: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  daysOfOperation: [String],
  classes: [String],
  fares: {
    SL: Number,
    '3A': Number,
    '2A': Number,
    '1A': Number,
    CC: Number,
    EC: Number
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

const stations = [
  { code: 'NGP', name: 'Nagpur Junction', city: 'Nagpur', zone: 'CR' },
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', zone: 'WCR' },
  { code: 'ET', name: 'Itarsi Junction', city: 'Itarsi', zone: 'CR' },
  { code: 'VGLJ', name: 'Virangana Lakshmibai Jhansi', city: 'Jhansi', zone: 'NCR' },
  { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', zone: 'NR' },
  { code: 'NZM', name: 'Hazrat Nizamuddin', city: 'Delhi', zone: 'NR' }
];

const trains = [
  // Direct Train: Bilaspur Rajdhani (NGP -> NDLS)
  {
    trainNumber: '12441',
    trainName: 'Bilaspur New Delhi Rajdhani Express',
    origin: 'NGP',
    destination: 'NDLS',
    departureTime: '21:30',
    arrivalTime: '10:40',
    duration: '13h 10m',
    durationMinutes: 790,
    daysOfOperation: ['Mon', 'Thu'],
    classes: ['3A', '2A', '1A'],
    fares: { '3A': 2180, '2A': 3020, '1A': 4495 },
    stops: [
      { stationCode: 'NGP', stationName: 'Nagpur Jn', departureTime: '21:30', dayOffset: 0 },
      { stationCode: 'BPL', stationName: 'Bhopal Jn', arrivalTime: '02:05', departureTime: '02:15', haltMinutes: 10, dayOffset: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '10:40', dayOffset: 1 }
    ]
  },
  // Leg 1 (Split Pair 1): Vande Bharat Express (NGP -> BPL)
  {
    trainNumber: '20825',
    trainName: 'Nagpur - Bhopal Vande Bharat Express',
    origin: 'NGP',
    destination: 'BPL',
    departureTime: '14:05',
    arrivalTime: '19:25',
    duration: '5h 20m',
    durationMinutes: 320,
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    classes: ['CC', 'EC'],
    fares: { CC: 1240, EC: 2350, '3A': 1240, '2A': 2350, SL: 550 },
    stops: [
      { stationCode: 'NGP', stationName: 'Nagpur Jn', departureTime: '14:05', dayOffset: 0 },
      { stationCode: 'ET', stationName: 'Itarsi Jn', arrivalTime: '17:40', departureTime: '17:45', haltMinutes: 5, dayOffset: 0 },
      { stationCode: 'BPL', stationName: 'Bhopal Jn', arrivalTime: '19:25', dayOffset: 0 }
    ]
  },
  // Leg 2 (Split Pair 1): Shaan-e-Bhopal Superfast (BPL -> NZM / NDLS)
  // Departs 22:40 (Layover from 19:25 is 3h 15m)
  {
    trainNumber: '12155',
    trainName: 'Shaan-e-Bhopal Superfast Express',
    origin: 'BPL',
    destination: 'NDLS',
    departureTime: '22:40',
    arrivalTime: '07:55',
    duration: '9h 15m',
    durationMinutes: 555,
    daysOfOperation: ['Daily'],
    classes: ['SL', '3A', '2A', '1A'],
    fares: { SL: 395, '3A': 1050, '2A': 1510, '1A': 2550 },
    stops: [
      { stationCode: 'BPL', stationName: 'Bhopal Jn', departureTime: '22:40', dayOffset: 0 },
      { stationCode: 'VGLJ', stationName: 'VGL Jhansi', arrivalTime: '02:00', departureTime: '02:08', haltMinutes: 8, dayOffset: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '07:55', dayOffset: 1 }
    ]
  },
  // Leg 1 (Split Pair 2): Grand Trunk Express (NGP -> ET)
  {
    trainNumber: '12615',
    trainName: 'Grand Trunk Express',
    origin: 'NGP',
    destination: 'ET',
    departureTime: '11:50',
    arrivalTime: '15:50',
    duration: '4h 00m',
    durationMinutes: 240,
    daysOfOperation: ['Daily'],
    classes: ['SL', '3A', '2A'],
    fares: { SL: 240, '3A': 630, '2A': 910 },
    stops: [
      { stationCode: 'NGP', stationName: 'Nagpur Jn', departureTime: '11:50', dayOffset: 0 },
      { stationCode: 'ET', stationName: 'Itarsi Jn', arrivalTime: '15:50', dayOffset: 0 }
    ]
  },
  // Leg 2 (Split Pair 2): Gondwana Express (ET -> NDLS)
  // Departs 17:15 (Layover from 15:50 is 1h 25m)
  {
    trainNumber: '12409',
    trainName: 'Gondwana Express',
    origin: 'ET',
    destination: 'NDLS',
    departureTime: '17:15',
    arrivalTime: '06:00',
    duration: '12h 45m',
    durationMinutes: 765,
    daysOfOperation: ['Daily'],
    classes: ['SL', '3A', '2A'],
    fares: { SL: 430, '3A': 1120, '2A': 1620 },
    stops: [
      { stationCode: 'ET', stationName: 'Itarsi Jn', departureTime: '17:15', dayOffset: 0 },
      { stationCode: 'BPL', stationName: 'Bhopal Jn', arrivalTime: '18:50', departureTime: '18:55', haltMinutes: 5, dayOffset: 0 },
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '06:00', dayOffset: 1 }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    await Station.deleteMany({});
    await Train.deleteMany({});

    await Station.insertMany(stations);
    console.log(`Inserted ${stations.length} stations.`);

    await Train.insertMany(trains);
    console.log(`Inserted ${trains.length} trains.`);

    console.log('Database seeded successfully with timetable data!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
