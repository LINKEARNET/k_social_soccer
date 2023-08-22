const pool = require("../config/database");
const keys = require("../keys");
const players = require("../models/player.model");
const Players = {};
const Teams = {};
Players.getListPlayers = async (req, res) => {
  const players = await pool.query('SELECT * FROM  players');
    res.render('Pages/player/list-players', {players});
};

Players.postPlayer= async (req, res) => {
    const {
        name,lastname,age,cedula,typePlayer,goalsMarked        
    } = req.body;
    const newLink = {
        name,lastname,age,cedula,typePlayer,goalsMarked 
    };
    await pool.query('INSERT INTO players set ?', [newLink]);
     //Flash
    req.flash('success','Jugador agregado Correctamenta');
    res.redirect("/players/list-players");
  };
  Players.deletePlayer = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM players WHERE ID = ?", [id]);
    req.flash('success','Jugador Eliminado correctamente');
    res.redirect("/players/list-players");
    };

Players.getPlayer = async (req, res) => {
  const { id } = req.params;
  const player = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
  res.render('Pages/player/edit-players', {player: player[0]});
  
};
Players.updatePlayer = async (req, res) => {
  const { id } = req.params;
  const {name,lastname,age,cedula,typePlayer,goalsMarked 
  } = req.body;
  const newLink = {name,lastname,age,cedula,typePlayer,goalsMarked 
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE players set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Jugador editado Correctamenta');  
  res.redirect('/players/list-players');
};


Players.getAddTeams = async (req, res) => {
  const teams = await pool.query('SELECT * FROM  teams');
    res.render('Pages/player/players', {teams});  
  };

module.exports = Players;
