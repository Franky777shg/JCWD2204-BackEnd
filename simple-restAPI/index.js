const express = require("express");
const PORT = 2000;
const server = express();

server.use(express.json());

let database = [
  {
    id: 5,
    name: "Budi",
    age: 12,
  },
  {
    id: 6,
    name: "Anna",
    age: 14,
  },
];

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to my API</h1>");
});

// register new user
server.post("/register", (req, res) => {
  database.push(req.body);
  res.status(200).send(database);
});

server.get("/all-user", (req, res) => {
  res.status(200).send(database);
});

server.post("/userById/:id", (req, res) => {
  //   console.log(req.params.id);
  let result = database.filter((item) => item.id === +req.params.id);
  res.status(200).send(result[0]);
});

// delete user by id
// edit user by id

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
