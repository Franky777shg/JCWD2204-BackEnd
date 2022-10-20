const fs = require("fs");

module.exports = {
  allExpense: (req, res) => {
    const data = fs.readFileSync("./db.json", "utf-8");
    res.status(200).send(JSON.parse(data));
  },
  createExpense: (req, res) => {
    const data = fs.readFileSync("./db.json", "utf-8");

    const currentData = JSON.parse(data);

    let listID = currentData.map((item) => item.id);

    let maxID = Math.max(...listID);

    req.body.id = maxID + 1;

    currentData.push(req.body);

    fs.writeFileSync("./db.json", JSON.stringify(currentData), "utf-8");

    res.status(200).send(currentData);
  },
  getById: (req, res) => {
    const data = fs.readFileSync("./db.json", "utf-8");

    const currentData = JSON.parse(data);

    let result = currentData.filter((item) => item.id === +req.params.id); // [{}]

    res.status(200).send(result[0]);
  },
  deleteById: (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const index = data.findIndex((item) => item.id === +req.params.id);

    data.splice(index, 1);

    fs.writeFileSync("./db.json", JSON.stringify(data), "utf-8");

    res.status(200).send(data);
  },
  editById: (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const user = data.filter((item) => item.id === +req.params.id)[0];

    for (let key in user) {
      if (req.body[key]) {
        user[key] = req.body[key];
      }
    }

    fs.writeFileSync("./db.json", JSON.stringify(data), "utf-8");

    res.status(200).send(data);
  },
  totalByCate: (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    let result = data.filter((item) => item.category === req.query.category);

    let total = result.map((item) => item.nominal).reduce((a, b) => a + b);

    res.status(200).send(`Rp ${total.toLocaleString()}`);
  },
};
