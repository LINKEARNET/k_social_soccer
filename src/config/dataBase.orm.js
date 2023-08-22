const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "social_soccer_public";

mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  user     : process.env.DB_USER || "root",
  password : process.env.DB_PASSWORD || "",
}).then( connection => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
      console.info("Database created or verified successfully");
  })
})

const usersModel = require('../models/user.model');
const playersModel = require('../models/player.model');
const teamsModel = require('../models/team.model');
const leagueRegularsModel = require('../models/leagueRegular.model');
const qualificationsModel = require('../models/qualification.model');


const sequelize = new Sequelize(
  'social_soccer_public',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Connect')
  })
  .catch(err => {
    console.log('No connect')
  })

sequelize.sync({ force: false })
  .then(() => {
    console.log("synchronized tables")
  })


  //sincronia//
const users = usersModel(sequelize, Sequelize);
const teams = teamsModel(sequelize, Sequelize);
const players = playersModel(sequelize, Sequelize);
const leagueRegulars = leagueRegularsModel(sequelize, Sequelize);
const qualifications = qualificationsModel(sequelize, Sequelize);



//Relaciones 

users.hasMany(players);
players.belongsTo(users);

users.hasMany(teams);
teams.belongsTo(users);

users.hasMany(leagueRegulars);
leagueRegulars.belongsTo(users);

users.hasMany(qualifications);
qualifications.belongsTo(users);

teams.hasMany(leagueRegulars);
leagueRegulars.belongsTo(teams);

teams.hasMany(players);
players.belongsTo(teams);

teams.hasMany(qualifications);
qualifications.belongsTo(teams);

leagueRegulars.hasMany(qualifications);
qualifications.belongsTo(leagueRegulars);



;

module.exports = {
  users,
  teams,
  players, 
  qualifications
 //Exportamos los modelos para usarlo en otros archivos

}