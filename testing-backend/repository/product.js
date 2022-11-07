const { Product } = require("../lib/sequelize");

const ProductRepository = {
  create: async (newData) => {
    try {
      const result = await Product.create(newData);
      return result;
    } catch (err) {
      throw err;
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await Product.findAll();
      return result;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = ProductRepository;
