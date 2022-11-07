const Product = require("../repository/product");

const ProductController = {
  create: async (req, res) => {
    try {
      const { name, price, quantity } = req.body;
      const newData = {
        name,
        price,
        quantity,
      };

      const result = await Product.create(newData);
      return res.status(200).send({
        result,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await Product.findAll();
      return res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = ProductController;
