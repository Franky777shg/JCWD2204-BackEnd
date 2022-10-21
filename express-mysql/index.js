const express = require("express");
const PORT = 2000;
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to my API</h1>");
});

const db = require("./database");

db.connect((err) => {
  if (err) console.log(err);
  else console.log(`Success connect to mysql with ID: ${db.threadId}`);
});

const { user } = require("./routers");
server.use("/user", user);

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
