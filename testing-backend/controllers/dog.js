const { images } = require("../repository/dog");

const DogController = {
  imageList: async (req, res) => {
    try {
      const result = await images();
      return res.status(200).send({ result });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  },
};

module.exports = DogController;
