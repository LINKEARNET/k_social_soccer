const pool = require("../config/database");
const keys = require("../models/qualification.model");
const { isLoggedIn } = require('../lib/auth');
const teams = require("../models/team.model");
const Keys = {};



/*Keys.getKeys =  async(req, res) => {
    //res.render("pages/users/list");
    const keys = await pool.query('SELECT * FROM  keys');  
    res.render('pages/championship/keys', {keys})
};*/

Keys.getListTeams = async (req, res) => {
    const teams = await pool.query('SELECT * FROM  teams');
      res.render('Pages/team/list-teams', {teams});
  };


  Keys.getAddTeams = async (req, res) => {
    const teams = await pool.query('SELECT * FROM  teams');
      res.render('Pages/championship/keys', {teams});  
    };

/*Keys.postKey = async (req, res) => {
    const { name, email, description } = req.body;
    const newUser = {
        name,
        email,
        description
    };
    await pool.query("INSERT INTO users set?", [newUser]);
    req.flash('success', 'creado');
    res.redirect("/users/list-users");
};

Keys.deleteKey = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE ID = ?", [id]);
    req.flash('success', 'Eliminado');
    res.redirect("/users/list-users");
};*/

module.exports = Keys;

