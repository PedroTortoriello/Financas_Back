const mysql = require('mysql2/promise');

const FinançasConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '110221',
  database: 'tfinancas_db'
});

module.exports = FinançasConnection;
