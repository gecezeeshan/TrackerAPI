// database.js
const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(':memory:'); // Use ':memory:' for in-memory DB or './mydb.sqlite' for file-based DB



const path = require('path');

// Create or open a file-based SQLite database
const dbPath = path.resolve( 'database.sqlite'); // This will store the database in the project folder
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


// Create 'user' table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      age INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tracker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    date TEXT NOT NULL,
    fajar INTEGER NOT NULL,
    zuhar INTEGER NOT NULL,
    asar INTEGER NOT NULL,
    maghrib INTEGER NOT NULL,
    isha INTEGER NOT NULL
)`);


});

module.exports = db;
