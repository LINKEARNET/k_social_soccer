const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { isLoggedIn } = require('../lib/auth');

const profileController = require('../controllers/profiles.controller');

//views users
router.get('/', isLoggedIn, usersController.getListUsers);
router.post('/user', isLoggedIn, usersController.postUsers);
router.get('/list-users', isLoggedIn, usersController.getListUsers );
router.get('/delete-users/:id',isLoggedIn, usersController.deleteUser);
router.get('/edit-users/:id',isLoggedIn, usersController.getUser);
router.post('/edit-users/:id',isLoggedIn, usersController.updateUser);

//views profile

router.get('/profile', isLoggedIn, profileController.getProfile);
router.post('/image-profile', isLoggedIn, profileController.postImageProfile);
router.post('/update-profile', isLoggedIn, profileController.updateImageProfile );




module.exports = router;