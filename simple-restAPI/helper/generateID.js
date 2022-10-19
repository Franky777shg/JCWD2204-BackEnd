module.exports = {
  generateID: (req, res, next) => {
    console.log("ini middleware untuk membuat ID");
    next();
  },
};
