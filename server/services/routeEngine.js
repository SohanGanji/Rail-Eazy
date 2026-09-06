const Schedule = require('../models/Schedule');
const Train = require('../models/Train');

function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
}

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${String(m).padStart(2, '0')}m`;
}

function normalizeTrain(doc) {
    const raw = doc.toObject ? doc.toObject() : doc;
    const origin = (raw.origin || raw.originStation || '').toUpperCase();
    const destination = (raw.destination || raw.destinationStation || '').toUpperCase();
    const depMinutes = raw.departureMinutes !== undefined ? raw.departureMinutes : timeToMinutes(raw.departureTime);
    const arrMinutes = raw.arrivalMinutes !== undefined ? raw.arrivalMinutes : timeToMinutes(raw.arrivalTime);
    const durMinutes = raw.durationMinutes !== undefined ? raw.durationMinutes : (arrMinutes >= depMinutes ? arrMinutes - depMinutes : 1440 - depMinutes + arrMinutes);
    const duration = raw.duration || formatDuration(durMinutes);

    return {
        trainNumber: raw.trainNumber,
        trainName: raw.trainName,
        origin,
        destination,
        departureTime: raw.departureTime,
        arrivalTime: raw.arrivalTime,
        departureMinutes: depMinutes,
        arrivalMinutes: arrMinutes,
        durationMinutes: durMinutes,
        duration,
        fares: raw.fares || {},
        stops: raw.stops || []
    };
}

async function findDirectRoutes(origin, destination, preferredClass = '3A') {
    const orig = origin.toUpperCase();
    const dest = destination.toUpperCase();

    let rawTrains = await Train.find({ origin: orig, destination: dest });
    if (!rawTrains.length) {
        rawTrains = await Schedule.find({ originStation: orig, destinationStation: dest });
    }

    return rawTrains.map(normalizeTrain).map(train => {
        const selectedFare = train.fares[preferredClass] || null;
        return {
            routeId: `DIRECT_${train.trainNumber}`,
            routeType: 'direct',
            train: {
                trainNumber: train.trainNumber,
                trainName: train.trainName,
                origin: train.origin,
                destination: train.destination,
                departureTime: train.departureTime,
                arrivalTime: train.arrivalTime,
                duration: train.duration,
                fares: train.fares,
                selectedClass: preferredClass,
                selectedFare
            },
            summary: {
                totalDurationMinutes: train.durationMinutes,
                totalTravelTime: train.duration,
                totalFare: selectedFare
            }
        };
    });
}

async function findSplitRoutes({
    origin,
    destination,
    intermediate = null,
    minLayoverMinutes = 45,
    maxLayoverMinutes = 360,
    preferredClass = '3A'
}) {
    const originCode = origin.toUpperCase();
    const destCode = destination.toUpperCase();
    const intermediateCode = intermediate ? intermediate.toUpperCase() : null;

    const useTrainModel = (await Train.countDocuments()) > 0;

    let leg1Trains = [];
    if (useTrainModel) {
        const query = { origin: originCode };
        if (intermediateCode) query.destination = intermediateCode;
        leg1Trains = (await Train.find(query)).map(normalizeTrain);
    } else {
        const query = { originStation: originCode };
        if (intermediateCode) query.destinationStation = intermediateCode;
        leg1Trains = (await Schedule.find(query)).map(normalizeTrain);
    }

    const validSplitRoutes = [];

    for (const trainA of leg1Trains) {
        const junctionStation = trainA.destination;
        if (junctionStation === destCode) continue;

        let leg2Trains = [];
        if (useTrainModel) {
            leg2Trains = (await Train.find({ origin: junctionStation, destination: destCode })).map(normalizeTrain);
        } else {
            leg2Trains = (await Schedule.find({ originStation: junctionStation, destinationStation: destCode })).map(normalizeTrain);
        }

        for (const trainB of leg2Trains) {
            let layoverMinutes = 0;
            if (trainB.departureMinutes >= trainA.arrivalMinutes) {
                layoverMinutes = trainB.departureMinutes - trainA.arrivalMinutes;
            } else {
                layoverMinutes = (1440 - trainA.arrivalMinutes) + trainB.departureMinutes;
            }

            if (layoverMinutes >= minLayoverMinutes && layoverMinutes <= maxLayoverMinutes) {
                const totalDuration = trainA.durationMinutes + layoverMinutes + trainB.durationMinutes;
                const fareA = trainA.fares[preferredClass] || null;
                const fareB = trainB.fares[preferredClass] || null;
                const totalFare = (fareA !== null && fareB !== null) ? fareA + fareB : null;

                validSplitRoutes.push({
                    routeId: `SPLIT_${trainA.trainNumber}_${junctionStation}_${trainB.trainNumber}`,
                    routeType: 'split',
                    intermediateStation: junctionStation,
                    layover: {
                        durationMinutes: layoverMinutes,
                        formatted: formatDuration(layoverMinutes),
                        isSafe: layoverMinutes >= 60
                    },
                    leg1: {
                        trainNumber: trainA.trainNumber,
                        trainName: trainA.trainName,
                        origin: trainA.origin,
                        destination: trainA.destination,
                        departureTime: trainA.departureTime,
                        arrivalTime: trainA.arrivalTime,
                        duration: trainA.duration,
                        fares: trainA.fares,
                        selectedClass: preferredClass,
                        selectedFare: fareA
                    },
                    leg2: {
                        trainNumber: trainB.trainNumber,
                        trainName: trainB.trainName,
                        origin: trainB.origin,
                        destination: trainB.destination,
                        departureTime: trainB.departureTime,
                        arrivalTime: trainB.arrivalTime,
                        duration: trainB.duration,
                        fares: trainB.fares,
                        selectedClass: preferredClass,
                        selectedFare: fareB
                    },
                    summary: {
                        totalDurationMinutes: totalDuration,
                        totalTravelTime: formatDuration(totalDuration),
                        totalFare
                    }
                });
            }
        }
    }

    validSplitRoutes.sort((a, b) => a.summary.totalDurationMinutes - b.summary.totalDurationMinutes);
    return validSplitRoutes;
}

module.exports = {
    findDirectRoutes,
    findSplitRoutes
};