const express = require("express");
const PORT = 2000;
const server = express();

server.use(express.json());

let database = [
  {
    name: "Budi",
    age: 12,
  },
  {
    name: "Anna",
    age: 14,
  },
];

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to my API</h1>");
});

server.post("/register", (req, res) => {
  console.log(req.body);
  res.status(200).send("test");
});

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
