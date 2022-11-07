const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
  return sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Product;
