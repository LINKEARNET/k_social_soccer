const pool = require("../config/database");
const teams = require("../models/team.model");


const Teams = {};

Teams.getListTeams = async (req, res) => {
  const teams = await pool.query('SELECT * FROM  teams');
    res.render('Pages/team/list-teams', {teams});
};

Teams.getAddTeams = async (req, res) => {
  res.render('Pages/team/teams')
};

Teams.postTeam = async (req, res) => {
    const {
      name_president,  name, category, series, initials, description, mail, creation_date, main_color, secondary_color, phone
    } = req.body;
    const newLink = {
      name_president, name, category, series, initials, description, mail, creation_date, main_color, secondary_color, phone
    };
    await pool.query('INSERT INTO teams set ?', [newLink]);
     //Flash
    req.flash('success','Agregado Correctamenta');
    res.redirect("/teams/list-teams");
  };

  Teams.deleteTeam = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM teams WHERE ID = ?", [id]);
    req.flash('success','Eliminado correctamente');
    res.redirect("/teams/list-teams");
    };

//actualizar//
Teams.getTeam = async (req, res) => {
  const { id } = req.params;
  const team = await pool.query('SELECT * FROM teams WHERE id = ?', [id]);
  res.render('Pages/team/edit-teams', {team: team[0]});
  
};

//se mostrara actualizado en la lista//
Teams.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name_president,name, category, series, initials, description, mail, creation_date, main_color, secondary_color, phone
  } = req.body;
  const newLink = {name_president, name, category, series, initials, description, mail, creation_date, main_color, secondary_color, phone
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE teams set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Editado Correctamenta');  
  res.redirect('/teams/list-teams');
};

module.exports = Teams;
