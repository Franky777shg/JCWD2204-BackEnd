const express = require("express");
const cors = require("cors");
const PORT = 2000;
const server = express();
const db = require("./models");

server.use(express.json());
server.use(cors());

const { user } = require("./routers");
server.use("/users", user);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
