const Schedule = require('../models/Schedule');
const Train = require('../models/Train');

function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
}

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${String(m).padStart(2, '0')}m`;
}

function extractSegment(trainDoc, fromCode, toCode) {
    const raw = trainDoc.toObject ? trainDoc.toObject() : trainDoc;
    fromCode = fromCode.toUpperCase();
    toCode = toCode.toUpperCase();

    const tOrig = (raw.origin || raw.originStation || '').toUpperCase();
    const tDest = (raw.destination || raw.destinationStation || '').toUpperCase();

    // 1. Direct origin-destination
    if (tOrig === fromCode && tDest === toCode) {
        const depTime = (raw.departureTime || '08:00').slice(0, 5);
        const arrTime = (raw.arrivalTime || '20:00').slice(0, 5);
        const depMinutes = raw.departureMinutes !== undefined ? raw.departureMinutes : timeToMinutes(depTime);
        const arrMinutes = raw.arrivalMinutes !== undefined ? raw.arrivalMinutes : timeToMinutes(arrTime);
        const durMinutes = raw.durationMinutes || (arrMinutes >= depMinutes ? arrMinutes - depMinutes : 1440 - depMinutes + arrMinutes);

        return {
            trainNumber: raw.trainNumber,
            trainName: raw.trainName,
            origin: fromCode,
            destination: toCode,
            departureTime: depTime,
            arrivalTime: arrTime,
            departureMinutes: depMinutes,
            arrivalMinutes: arrMinutes,
            durationMinutes: durMinutes,
            duration: formatDuration(durMinutes),
            fares: raw.fares || {}
        };
    }

    // 2. Stop-to-stop extraction
    if (raw.stops && raw.stops.length > 0) {
        const fromStop = raw.stops.find(s => s.stationCode === fromCode);
        const toStop = raw.stops.find(s => s.stationCode === toCode);
        if (fromStop && toStop) {
            const fromIdx = raw.stops.indexOf(fromStop);
            const toIdx = raw.stops.indexOf(toStop);
            if (fromIdx < toIdx) {
                const depTimeStr = (fromStop.departureTime && fromStop.departureTime !== 'None') 
                    ? fromStop.departureTime 
                    : (fromStop.arrivalTime || raw.departureTime || '08:00');
                const arrTimeStr = (toStop.arrivalTime && toStop.arrivalTime !== 'None') 
                    ? toStop.arrivalTime 
                    : (toStop.departureTime || raw.arrivalTime || '20:00');

                const depTime = depTimeStr.slice(0, 5);
                const arrTime = arrTimeStr.slice(0, 5);
                const depMinutes = timeToMinutes(depTime);
                const arrMinutes = timeToMinutes(arrTime);
                const durMinutes = arrMinutes >= depMinutes ? arrMinutes - depMinutes : 1440 - depMinutes + arrMinutes;

                return {
                    trainNumber: raw.trainNumber,
                    trainName: raw.trainName,
                    origin: fromCode,
                    destination: toCode,
                    departureTime: depTime,
                    arrivalTime: arrTime,
                    departureMinutes: depMinutes,
                    arrivalMinutes: arrMinutes,
                    durationMinutes: durMinutes,
                    duration: formatDuration(durMinutes),
                    fares: raw.fares || {}
                };
            }
        }
    }

    return null;
}

const TRAIN_FIELDS = 'trainNumber trainName origin destination departureTime arrivalTime duration durationMinutes fares stops';

async function findDirectRoutes(origin, destination, preferredClass = '3A') {
    const orig = origin.toUpperCase();
    const dest = destination.toUpperCase();

    // Query Train collection with stop awareness
    let candidates = await Train.find({
        $or: [
            { origin: orig, destination: dest },
            { 'stops.stationCode': { $all: [orig, dest] } }
        ]
    }, TRAIN_FIELDS);

    if (!candidates.length) {
        candidates = await Schedule.find({ originStation: orig, destinationStation: dest });
    }

    const directRoutes = [];
    const seenTrains = new Set();

    for (const doc of candidates) {
        const seg = extractSegment(doc, orig, dest);
        if (seg && !seenTrains.has(seg.trainNumber)) {
            seenTrains.add(seg.trainNumber);
            const selectedFare = seg.fares[preferredClass] || null;
            directRoutes.push({
                routeId: `DIRECT_${seg.trainNumber}`,
                routeType: 'direct',
                train: {
                    trainNumber: seg.trainNumber,
                    trainName: seg.trainName,
                    origin: seg.origin,
                    destination: seg.destination,
                    departureTime: seg.departureTime,
                    arrivalTime: seg.arrivalTime,
                    duration: seg.duration,
                    fares: seg.fares,
                    selectedClass: preferredClass,
                    selectedFare
                },
                summary: {
                    totalDurationMinutes: seg.durationMinutes,
                    totalTravelTime: seg.duration,
                    totalFare: selectedFare
                }
            });
        }
    }

    directRoutes.sort((a, b) => a.summary.totalDurationMinutes - b.summary.totalDurationMinutes);
    return directRoutes;
}

// Major strategic corridor junctions
const COMMON_JUNCTIONS = ['BPL', 'ET', 'VGLJ'];

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

    const junctionsToTry = intermediate ? [intermediate.toUpperCase()] : COMMON_JUNCTIONS;
    const validSplitRoutes = [];
    const seenPairs = new Set();

    const junctionPromises = junctionsToTry.map(async (junction) => {
        if (junction === originCode || junction === destCode) return [];

        const [leg1Candidates, leg2Candidates] = await Promise.all([
            Train.find({
                $or: [
                    { origin: originCode, destination: junction },
                    { 'stops.stationCode': { $all: [originCode, junction] } }
                ]
            }, TRAIN_FIELDS).lean(),
            Train.find({
                $or: [
                    { origin: junction, destination: destCode },
                    { 'stops.stationCode': { $all: [junction, destCode] } }
                ]
            }, TRAIN_FIELDS).lean()
        ]);

        const leg1Segments = leg1Candidates
            .map(t => extractSegment(t, originCode, junction))
            .filter(Boolean);

        const leg2Segments = leg2Candidates
            .map(t => extractSegment(t, junction, destCode))
            .filter(Boolean);

        const routesForJunction = [];

        for (const segA of leg1Segments) {
            for (const segB of leg2Segments) {
                if (segA.trainNumber === segB.trainNumber) continue;

                let layoverMinutes = 0;
                if (segB.departureMinutes >= segA.arrivalMinutes) {
                    layoverMinutes = segB.departureMinutes - segA.arrivalMinutes;
                } else {
                    layoverMinutes = (1440 - segA.arrivalMinutes) + segB.departureMinutes;
                }

                if (layoverMinutes >= minLayoverMinutes && layoverMinutes <= maxLayoverMinutes) {
                    const pairKey = `${segA.trainNumber}_${junction}_${segB.trainNumber}`;
                    if (seenPairs.has(pairKey)) continue;
                    seenPairs.add(pairKey);

                    const totalDuration = segA.durationMinutes + layoverMinutes + segB.durationMinutes;
                    const fareA = segA.fares[preferredClass] || null;
                    const fareB = segB.fares[preferredClass] || null;
                    const totalFare = (fareA !== null && fareB !== null) ? fareA + fareB : null;

                    routesForJunction.push({
                        routeId: `SPLIT_${segA.trainNumber}_${junction}_${segB.trainNumber}`,
                        routeType: 'split',
                        intermediateStation: junction,
                        layover: {
                            durationMinutes: layoverMinutes,
                            formatted: formatDuration(layoverMinutes),
                            isSafe: layoverMinutes >= 60
                        },
                        leg1: {
                            trainNumber: segA.trainNumber,
                            trainName: segA.trainName,
                            origin: segA.origin,
                            destination: segA.destination,
                            departureTime: segA.departureTime,
                            arrivalTime: segA.arrivalTime,
                            duration: segA.duration,
                            fares: segA.fares,
                            selectedClass: preferredClass,
                            selectedFare: fareA
                        },
                        leg2: {
                            trainNumber: segB.trainNumber,
                            trainName: segB.trainName,
                            origin: segB.origin,
                            destination: segB.destination,
                            departureTime: segB.departureTime,
                            arrivalTime: segB.arrivalTime,
                            duration: segB.duration,
                            fares: segB.fares,
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

        return routesForJunction;
    });

    const results = await Promise.all(junctionPromises);
    results.forEach(routes => validSplitRoutes.push(...routes));

    validSplitRoutes.sort((a, b) => a.summary.totalDurationMinutes - b.summary.totalDurationMinutes);
    return validSplitRoutes.slice(0, 50); // Top 50 best connections
}

module.exports = {
    findDirectRoutes,
    findSplitRoutes
};