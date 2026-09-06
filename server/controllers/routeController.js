const { findDirectRoutes, findSplitRoutes } = require('../services/routeEngine');
const Station = require('../models/Station');

async function getStations(req, res) {
    try {
        const stations = await Station.find({}, 'code name city state isJunction');
        res.json({ success: true, count: stations.length, data: stations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function searchRoutes(req, res) {
    try {
        const {
            origin,
            destination,
            intermediate,
            minLayoverMinutes = 45,
            maxLayoverMinutes = 360,
            preferredClass = '3A'
        } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({
                success: false,
                message: 'Origin and destination station codes are required.'
            });
        }

        const [directRoutes, splitRoutes] = await Promise.all([
            findDirectRoutes(origin, destination, preferredClass),
            findSplitRoutes({
                origin,
                destination,
                intermediate: intermediate || null,
                minLayoverMinutes: parseInt(minLayoverMinutes, 10),
                maxLayoverMinutes: parseInt(maxLayoverMinutes, 10),
                preferredClass
            })
        ]);

        res.json({
            success: true,
            query: {
                origin: origin.toUpperCase(),
                destination: destination.toUpperCase(),
                intermediate: intermediate ? intermediate.toUpperCase() : null,
                preferredClass
            },
            directCount: directRoutes.length,
            splitCount: splitRoutes.length,
            directRoutes,
            splitRoutes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    getStations,
    searchRoutes
};