// Bring Mongoose into the app
var mongoose = require('mongoose');
var config = require('./config');

// Create the database connection
mongoose.connect(config.database);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.database);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN SCHEMAS & MODELS
require('../models/user.model');
require('../models/user.session.model');
