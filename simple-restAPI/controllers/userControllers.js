const fs = require("fs");

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

module.exports = {
  register: (req, res) => {
    database.push(req.body);
    res.status(200).send(database);
  },
  getAllUser: (req, res) => {
    res.status(200).send(database);
  },
  getUserById: (req, res) => {
    //   console.log(req.params.id);
    let result = database.filter((item) => item.id === +req.params.id);
    res.status(200).send(result[0]);
  },
  deleteUserById: (req, res) => {
    let id = database.findIndex((item) => item.id !== +req.params.id);
    //   console.log(id);
    database.splice(id, 1);
    res.status(200).send(database);
  },
  editById: (req, res) => {
    let user = database.filter((item) => item.id === +req.params.id)[0];
    for (let keys in user) {
      if (req.body[keys]) {
        user[keys] = req.body[keys];
      }
    }
    res.status(200).send(database);
  },
  getExpense: (req, res) => {
    const data = fs.readFileSync("./db.json", "utf-8");
    console.log(data);
    res.status(200).send("test");
  },
  writeExpense: (req, res) => {
    const data = fs.readFileSync("./db.json", "utf-8");
    console.log(data);
    const oldData = JSON.parse(data);
    console.log(oldData);
    oldData.push({
      id: 1,
      name: "beli batagor",
      nominal: 6000,
      category: "makan",
    });
    console.log(oldData);
    fs.writeFileSync("./db.json", JSON.stringify(oldData), "utf-8");
    res.status(200).send("test");
  },
};
