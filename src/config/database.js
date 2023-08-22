const mysql = require('mysql');
const { promisify }= require('util');
const dotenv = require('dotenv');

// const { database } = require('../keys')


dotenv.config();

const {     
  MYSQLHOST,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDATABASE,
  MYSQLPORT,
  MYSQL_URI } = require('../keys');

const pool = mysql.createPool( {   
  user: MYSQLUSER,
    password: MYSQLPASSWORD,
    host: MYSQLHOST,
    port: MYSQLPORT,
    database: MYSQLDATABASE,
    uri: MYSQL_URI})

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;