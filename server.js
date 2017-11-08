// Get dependencies
const express = require('express'),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  models = require('./api/models'),
  config = require('./api/config');

const app = express();

// Get our api routes
const api = require('./api/routes/api');
const users = require('./api/routes/users');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(require('express-session')({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Load up mongoose models
app.use((req, res, next) => {
  if (!models.User || !models.UserSession) {
    return next(new Error("No models."))
  }
  req.models = models;
  return next();
});

// Set our api routes
app.use('/api', api);
app.use('/api/users', users);

// Passport config
passport.use(new LocalStrategy(models.User.authenticate()));
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});
