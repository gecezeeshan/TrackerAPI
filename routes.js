const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('./userController.js');
const { createTracker, getAllTrackers, getTrackerByUserIdAndDate, updateTracker, deleteTracker } = require('./trackerController.js');


class RouteHandler {
    constructor(app) {
        this.app = app; // Store the reference to the Express app
    }

    // Define routes
    registerRoutes() {


        // User routes
        this.app.post('/users', createUser);       // Create a new user
        this.app.get('/users', getAllUsers);       // Get all users
        this.app.get('/users/:id', getUserById);   // Get user by ID
        this.app.put('/users/:id', updateUserById);  // Update user by ID
        this.app.delete('/users/:id', deleteUserById); // Delete user by ID


        this.app.get('/tracker', getAllTrackers);
        this.app.post('/tracker', createTracker);
        this.app.put('/tracker/:id', getTrackerByUserIdAndDate);
        this.app.delete('/tracker/:id', deleteUserById);
        this.app.put('/tracker/:id', updateTracker);  // Update user by ID
    }
}

module.exports = RouteHandler;
