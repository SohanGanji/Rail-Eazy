require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routeRoutes = require('./routes/routeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/routes', routeRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'rail-eazy-backend' });
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to Atlas.');
        app.listen(PORT, () => {
            console.log(`Rail Eazy API running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Server startup failed:', err.message);
        process.exit(1);
    }
}

startServer();