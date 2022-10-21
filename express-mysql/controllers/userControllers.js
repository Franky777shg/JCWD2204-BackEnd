const db = require("../database");

module.exports = {
  allUser: (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
};
