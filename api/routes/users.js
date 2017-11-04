const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/register', (req, res, next) => {
  userCtrl.register(req, res, next);
});

router.post('/login', (req, res, next) => {
  userCtrl.login(req, res, next);
});

router.put('/update/:id', (req, res, next) => {
  userCtrl.update(req, res, next);
});

router.get('/status', (req, res) => {
  userCtrl.getStatus(req, res);
});

router.get('/logout', (req, res) => {
  userCtrl.logout(req, res);
});

module.exports = router;
