const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

module.exports = connection;
