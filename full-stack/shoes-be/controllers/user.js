// setup sequelize
const db = require("../models");
const user = db.User;

// setup data
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      let { username, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const dataUser = await user.create({
        username,
        email,
        password: hashPass,
      });
      res.status(200).send(dataUser);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
