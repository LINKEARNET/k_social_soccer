const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../config/database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const users = require('../models/user.model');



router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, async (req, res, next) => {

  passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});




router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/signin');
});



module.exports = router;