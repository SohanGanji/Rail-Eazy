require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Station = require('./models/Station');
const Schedule = require('./models/Schedule');

async function seedDatabase() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        console.log("Clearing existing station and schedule records...");
        await Station.deleteMany({});
        await Schedule.deleteMany({});

        console.log("Reading seedData.json...");
        const rawData = fs.readFileSync(path.join(__dirname, 'seedData.json'), 'utf-8');
        const { stations, schedules } = JSON.parse(rawData);

        console.log(`Inserting ${stations.length} stations...`);
        await Station.insertMany(stations);

        console.log(`Inserting ${schedules.length} schedules...`);
        await Schedule.insertMany(schedules);

        console.log("Database seeded successfully!");
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
}

seedDatabase();