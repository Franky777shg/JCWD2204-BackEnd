const axios = require("axios");

const DogRepository = {
  images: async () => {
    try {
      const { data } = await axios.get("https://dog.ceo/api/breed/hound/list");
      return data;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = DogRepository;
