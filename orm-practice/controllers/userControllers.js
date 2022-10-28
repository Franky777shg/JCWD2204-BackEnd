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
  getUserInSomeCity: async (req, res) => {
    try {
      const users = await db.City.findAll({
        include: db.User,
        where: {
          city: req.query.city,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  transactionExample: async (req, res) => {
    try {
      const { username, email, password, age, CityId, city, zipCode } =
        req.body;
      await db.sequelize.transaction(async (t) => {
        await db.User.create(
          {
            username,
            email,
            password,
            age,
            CityId,
          },
          { transaction: t }
        );

        await db.City.create(
          {
            city,
            zipCode,
          },
          { transaction: t }
        );
      });

      res.status(200).send("Success Transaction");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
