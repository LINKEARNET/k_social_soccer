const express = require('express');
const router = express.Router();
const keysController = require('../controllers/keys.controller');
const { isLoggedIn } = require('../lib/auth');



//views users
//router.get('/', isLoggedIn, keysController.getKeys);
router.get('/add', isLoggedIn, keysController.getAddTeams);




module.exports = router;

