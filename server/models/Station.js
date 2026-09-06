const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: false
    },
    zone: {
        type: String,
        required: false
    },
    isJunction: {
        type: Boolean,
        default: false
    },
    platforms: {
        type: Number,
        default: 2
    }
}, { timestamps: true });

module.exports = mongoose.model('Station', stationSchema);