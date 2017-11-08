module.exports = {
    secret: 'YOUR_SECRET',
    mongodb: {
        url: 'mongodb://localhost/meanstarter'
    }
};

// Bring Mongoose into the app
var mongoose = require('mongoose');
var config = require('./index');

// Create the database connection
mongoose.connect(config.mongodb.url);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.mongodb.url);
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
require('../models');