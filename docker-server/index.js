const express = require("express");
const mysql = require("mysql2");
const PORT = 2000;

const mysqlConfig = {
  host: "mysql_server",
  user: "root",
  password: "Mysql123",
  database: "testing_db",
};

const app = express();

app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.get("/connect", (req, res) => {
  try {
    let con = mysql.createConnection(mysqlConfig);
    con.connect((err) => {
      if (err) throw err;
      res.status(200).send("Connected to mysql");
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log("Success Running update connect mysql"));
