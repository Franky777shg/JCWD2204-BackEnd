const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);
      //   console.log(hashPass);

      await user.create({
        username,
        email,
        password: hashPass,
      });

      res.status(200).send("Register Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //   const salt = await bcrypt.genSalt(10);

      //   const hashPass = await bcrypt.hash(password, salt);
      //   console.log(hashPass);

      const isEmailExist = await user.findOne({
        where: {
          email,
        },
        raw: true,
      });
      if (isEmailExist === null) throw "Email not found";

      const isValid = await bcrypt.compare(password, isEmailExist.password);

      if (!isValid) throw "Email or password incorrect";

      res.status(200).send("Login Succes");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
