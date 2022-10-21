const express = require("express");
const PORT = 2000;
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to my API</h1>");
});

const { user } = require("./routers");
server.use("/user", user);

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
