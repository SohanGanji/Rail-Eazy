const Schedule = require('../models/Schedule');

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${String(m).padStart(2, '0')}m`;
}

async function findDirectRoutes(origin, destination, preferredClass = '3A') {
    const trains = await Schedule.find({
        originStation: origin.toUpperCase(),
        destinationStation: destination.toUpperCase()
    });

    return trains.map(train => {
        const selectedFare = train.fares[preferredClass] || null;
        return {
            routeId: `DIRECT_${train.trainNumber}`,
            routeType: 'direct',
            train: {
                trainNumber: train.trainNumber,
                trainName: train.trainName,
                origin: train.originStation,
                destination: train.destinationStation,
                departureTime: train.departureTime,
                arrivalTime: train.arrivalTime,
                duration: formatDuration(train.durationMinutes),
                fares: train.fares,
                selectedClass: preferredClass,
                selectedFare
            },
            summary: {
                totalDurationMinutes: train.durationMinutes,
                totalTravelTime: formatDuration(train.durationMinutes),
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

    const leg1Query = { originStation: originCode };
    if (intermediate) {
        leg1Query.destinationStation = intermediate.toUpperCase();
    }

    const leg1Trains = await Schedule.find(leg1Query);
    const validSplitRoutes = [];

    for (const trainA of leg1Trains) {
        const junctionStation = trainA.destinationStation;
        if (junctionStation === destCode) continue;

        const leg2Trains = await Schedule.find({
            originStation: junctionStation,
            destinationStation: destCode
        });

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
                        origin: trainA.originStation,
                        destination: trainA.destinationStation,
                        departureTime: trainA.departureTime,
                        arrivalTime: trainA.arrivalTime,
                        duration: formatDuration(trainA.durationMinutes),
                        fares: trainA.fares,
                        selectedClass: preferredClass,
                        selectedFare: fareA
                    },
                    leg2: {
                        trainNumber: trainB.trainNumber,
                        trainName: trainB.trainName,
                        origin: trainB.originStation,
                        destination: trainB.destinationStation,
                        departureTime: trainB.departureTime,
                        arrivalTime: trainB.arrivalTime,
                        duration: formatDuration(trainB.durationMinutes),
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