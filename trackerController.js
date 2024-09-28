

// Create a new tracker entry (C in CRUD)
const createTracker = async (tracker) => {
    const query = `INSERT INTO tracker (userId, date, fajar, zuhar, asar, maghrib, isha) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        tracker.userId,
        tracker.date,
        tracker.fajar,
        tracker.zuhar,
        tracker.asar,
        tracker.maghrib,
        tracker.isha,
    ];
    return await runQuery(query, params);
};

// Read all tracker entries (R in CRUD)
const getAllTrackers = async () => {
    const query = `SELECT * FROM tracker`;
    return await fetchResults(query);
};

// Read tracker by userId and date
const getTrackerByUserIdAndDate = async (userId, date) => {
    const query = `SELECT * FROM tracker WHERE userId = ? AND date = ?`;
    const params = [userId, date];
    return await fetchResults(query, params);
};

// Update a tracker entry (U in CRUD)
const updateTracker = async (tracker) => {
    const query = `UPDATE tracker 
                   SET fajar = ?, zuhar = ?, asar = ?, maghrib = ?, isha = ?
                   WHERE userId = ? AND date = ?`;
    const params = [
        tracker.fajar,
        tracker.zuhar,
        tracker.asar,
        tracker.maghrib,
        tracker.isha,
        tracker.userId,
        tracker.date,
    ];
    return await runQuery(query, params);
};

// Delete a tracker entry (D in CRUD)
const deleteTracker = async (userId, date) => {
    const query = `DELETE FROM tracker WHERE userId = ? AND date = ?`;
    const params = [userId, date];
    return await runQuery(query, params);
};

// Exporting the functions
module.exports = {
    createTracker,
    getAllTrackers,
    getTrackerByUserIdAndDate,
    updateTracker,
    deleteTracker,
};