const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, phone_number, password, password_confirmation } =
        req.body;
      if (password !== password_confirmation)
        throw "Password doesnt match with confirm password";
      const result = await db.User.create({
        email,
        username,
        phone_number,
        password,
      });

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, username, phone_number, password } = req.body;
      const result = await db.User.findAll({
        where: {
          [Op.and]: {
            password,
            [Op.or]: {
              email: email ? email : "",
              username: username ? username : "",
              phone_number: phone_number ? phone_number : "",
            },
          },
        },
      });
      if (result.length === 0) throw "Data doesnt match";
      res.status(200).send(result[0].dataValues);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
