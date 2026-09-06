const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    trainNumber: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    trainName: {
        type: String,
        required: true
    },
    originStation: {
        type: String,
        required: true,
        uppercase: true,
        ref: 'Station',
        index: true
    },
    destinationStation: {
        type: String,
        required: true,
        uppercase: true,
        ref: 'Station',
        index: true
    },
    departureTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    arrivalTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    departureMinutes: {
        type: Number,
        required: true
    },
    arrivalMinutes: {
        type: Number,
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true
    },
    distanceKm: {
        type: Number,
        required: true
    },
    runningDays: {
        type: [String],
        default: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    },
    fares: {
        '2S': { type: Number, default: null },
        'SL': { type: Number, default: null },
        'CC': { type: Number, default: null },
        '3A': { type: Number, default: null },
        '2A': { type: Number, default: null },
        '1A': { type: Number, default: null },
        'EC': { type: Number, default: null }
    }
}, { timestamps: true });

scheduleSchema.index({ originStation: 1, destinationStation: 1, departureMinutes: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);