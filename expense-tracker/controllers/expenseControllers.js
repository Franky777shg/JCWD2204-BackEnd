const fs = require("fs");

const getData = () => {
  return JSON.parse(fs.readFileSync("./db.json", "utf-8"));
};

module.exports = {
  allExpense: (req, res) => {
    const data = getData();
    res.status(200).send(data);
  },
  createExpense: (req, res) => {
    const data = getData();

    let listID = data.map((item) => item.id);

    let maxID = Math.max(...listID);

    const date = new Date();

    req.body.id = maxID + 1;

    req.body.date = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    data.push(req.body);

    fs.writeFileSync("./db.json", JSON.stringify(data), "utf-8");

    res.status(200).send(data);
  },
  getById: (req, res) => {
    const data = getData();

    let result = data.filter((item) => item.id === +req.params.id); // [{}]

    res.status(200).send(result[0]);
  },
  deleteById: (req, res) => {
    const data = getData();

    const index = data.findIndex((item) => item.id === +req.params.id);

    data.splice(index, 1);

    fs.writeFileSync("./db.json", JSON.stringify(data), "utf-8");

    res.status(200).send(data);
  },
  editById: (req, res) => {
    const data = getData();

    const user = data.filter((item) => item.id === +req.params.id)[0];

    for (let key in user) {
      if (req.body[key]) {
        user[key] = req.body[key];
      }
    }

    fs.writeFileSync("./db.json", JSON.stringify(data), "utf-8");

    res.status(200).send(data);
  },
  total: (req, res) => {
    const data = getData();

    let result;

    if (req.query.category) {
      result = data.filter((item) => item.category === req.query.category);
    } else if (req.query.date) {
      result = data.filter((item) => item.date === req.query.date);
    }

    let total = result.map((item) => item.nominal).reduce((a, b) => a + b);

    res.status(200).send(`Rp ${total.toLocaleString()}`);
  },
};
