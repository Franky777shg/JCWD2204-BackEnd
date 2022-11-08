const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(express.json());
app.use(cors());

const { user } = require("./routers");
app.use("/auth", user);

const port = 2000;
app.listen(port, () => {
  //   db.sequelize.sync({ alter: true });
  console.log(`Success Running at PORT: ${port}`);
});
