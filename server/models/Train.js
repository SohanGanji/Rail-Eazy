const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.models.Train || mongoose.model('Train', trainSchema);
