const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  add: async (req, res) => {
    try {
      await db.Expense.create(req.body);
      res.status(200).send("Success Create Expense");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  edit: async (req, res) => {
    try {
      await db.Expense.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Success Edit Expense");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  delete: async (req, res) => {
    try {
      await db.Expense.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Success Delete Expense");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
