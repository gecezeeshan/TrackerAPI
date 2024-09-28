// server.js
const express = require('express');
const app = express();

const RouteHandler = require('./routes.js');



// Middleware for parsing JSON bodies
app.use(express.json());


// Pass the app instance to the RouteHandler class
const routes = new RouteHandler(app);
routes.registerRoutes(); // Register routes using the app instance


// Default route
app.get('/', (req, res) => {
  res.send('SQLite CRUD API is running!');
});


// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
