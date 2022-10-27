const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");
server.use(express.json());

server.use("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

server.listen(PORT, () => {
  db.sequelize.sync({ alter: true });
  console.log(`Success Running at PORT: ${PORT}`);
});
