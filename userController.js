// userController.js
const db = require('./database');

// Create a new user
const createUser = (req, res) => {
  const { name, email, age } = req.body;

  db.run(
    `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
    [name, email, age],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        name,
        email,
        age,
      });
    }
  );
};

// Get all users
const getAllUsers = (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
};

// Get user by ID
const getUserById = (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
};

// Update user by ID
const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  db.run(
    `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`,
    [name, email, age, id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
};

// Delete user by ID
const deleteUserById = (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
};

// Export the functions to be used in server.js
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
