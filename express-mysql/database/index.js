const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "frankyshg",
  password: "Mysql123",
  database: "jcwd2204",
});

module.exports = db;
