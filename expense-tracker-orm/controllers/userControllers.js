const db = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, phone_number, password, password_confirmation } =
        req.body;
      if (password !== password_confirmation) {
        return res
          .status(400)
          .send("Password doesnt match with confirm password");
      }
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
          [Op.or]: {
            [Op.and]: [{ email: email ? email : "" }, { password }],
            [Op.and]: [{ username: username ? username : "" }, { password }],
            [Op.and]: [
              { phone_number: phone_number ? phone_number : "" },
              { password },
            ],
          },
        },
      });
      console.log(result);
      res.status(200).send("test");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
