const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");

server.use(express.json());

const { user } = require("./routers");
server.use("/users", user);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
