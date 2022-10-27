const db = require("../models");
const sequelize = require("sequelize");

module.exports = {
  register: async (req, res) => {
    try {
      const newData = await db.User.create(req.body);
      res.status(200).send(newData);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  totalUser: async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: [[sequelize.fn("COUNT", sequelize.col("age")), "total"]],
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getBy: async (req, res) => {
    try {
      const users = await db.User.findAll({
        where: {
          age: 18,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
