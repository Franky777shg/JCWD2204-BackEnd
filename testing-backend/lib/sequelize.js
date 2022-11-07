const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: "frankyshg",
  password: "Mysql123",
  database: "testing",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: true,
  raw: true,
});

const Product = require("../models/product")(sequelize);

module.exports = {
  sequelize,
  Product,
};
