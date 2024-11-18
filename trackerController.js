const db = require('./database');

// Define fetchResults function
const fetchResults = (query) => {
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

// Create a new tracker entry (C in CRUD)
const createTracker = async (tracker) => {
  var body = tracker.body;
    const query = `INSERT INTO tracker (userId, date, fajar, zuhar, asar, maghrib, isha) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      body.userId,
        body.date,
        body.fajar,
        body.zuhar,
        body.asar,
        body.maghrib,
        body.isha,
    ];
    debugger;
   // return await runQuery(query, params);
};


  

// Get all users
const getAllTrackers = (req, res) => {
    db.all(`SELECT * FROM tracker`, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ trackers: rows });
    });
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


// Create a new tracker
const  runQuery = async (query,params) => {
  debugger;
    db.run(
      query,
     ...params,
      function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({
          id: this.lastID,
          ...params
        });
      }
    );
  };


// Exporting the functions
module.exports = {
    createTracker,
    getAllTrackers,
    getTrackerByUserIdAndDate,
    updateTracker,
    deleteTracker,
};