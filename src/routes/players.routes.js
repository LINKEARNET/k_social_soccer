const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players.controller');
const { isLoggedIn } = require('../lib/auth');
const photoPlayersController = require('../controllers/photoPlayers.controller')

//viws players
router.get('/', isLoggedIn, playersController.getListPlayers);
router.post('/players', isLoggedIn,playersController.postPlayer);
router.get('/add', isLoggedIn, playersController.getAddTeams);
router.get('/list-players', isLoggedIn,playersController.getListPlayers);
router.get('/delete-players/:id', isLoggedIn,playersController.deletePlayer);
router.get('/edit-players/:id', isLoggedIn,playersController.getPlayer);
router.post('/edit-players/:id', isLoggedIn,playersController.updatePlayer);




//views photo
router.post('/photo-player/:id', isLoggedIn, photoPlayersController.updatePhoto);

module.exports = router;