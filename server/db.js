require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`SUCCESS: Connected to MongoDB cluster: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        console.error(`ERROR connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

testConnection();