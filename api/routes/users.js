const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.put('/update/:id', userCtrl.update);

router.get('/status', userCtrl.getStatus);

router.get('/logout', userCtrl.logout);

module.exports = router;
