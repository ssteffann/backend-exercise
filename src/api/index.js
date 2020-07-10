const express = require('express');
const cors = require('cors');
const app = express();

const {
  init: databaseInit,
  middleware: databaseMiddleware,
} = require('../database/database-init');

const bodyParser = require('body-parser');

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
databaseInit().catch((error) => console.error(error));
app.use(databaseMiddleware);

// Parses the body of POST/PUT request
// to JSON
app.use(bodyParser.json());

// Configure the Entity routes
const routes = express.Router();
require('./sensor')(routes);
require('./threshold')(routes);

// Add the routes to the /api endpoint
app.use('/', routes);

module.exports = app;
