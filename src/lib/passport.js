const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require('../config/dataBase.orm');
const pool = require('../config/database');
const helpers = require("../lib/helpers");


passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email])

/*   if(rows[0].roleId == 1){
    console.log(rows[0].roleId);
  } else if (rows[0].roleId == 2) {
    console.log(rows[0].roleId);
  } else if (rows[0].roleId == 3) {
    console.log(rows[0].roleId);
  }else{
    return done(null, false, req.flash('message', 'no tienes rol comunicate con el administrador'));
  } */

  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);

    if (validPassword ) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.name));
    } else {
      done(null, false, req.flash('message', 'Contraseña Incorecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El email no existe'));
  }
}));

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const { name } = req.body;

      const newUser = {
        email,
        password,
        name
      };
      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query('INSERT INTO users SET ? ', newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});