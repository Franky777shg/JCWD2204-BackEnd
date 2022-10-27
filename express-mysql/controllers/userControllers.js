const db = require("../database");

module.exports = {
  allUser: (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
  searchHunchbackFilm: (req, res) => {
    db.query(
      `SELECT * FROM inventory i JOIN film f USING(film_id) WHERE f.title = "HUNCHBACK IMPOSSIBLE"`,
      (err, result) => {
        if (err) return console.log(err);
        res.status(200).send(result);
      }
    );
  },
  register: (req, res) => {
    const { username, email, password } = req.body;
    const registerQuery =
      "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
    db.query(registerQuery, [username, email, password], (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
  delete: (req, res) => {
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    db.query(deleteQuery, [req.params.id], (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
  update: (req, res) => {
    const { string, data } = req.body;

    db.query(string, data, (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
};
