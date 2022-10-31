const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

      const isEmailExist = await user.findOne({
        where: {
          email,
        },
        raw: true,
      });
      if (isEmailExist === null) throw "Email not found";

      const isValid = await bcrypt.compare(password, isEmailExist.password);

      if (!isValid) throw "Email or password incorrect";

      const payload = { id: isEmailExist.id, isAdmin: isEmailExist.isAdmin };
      const token = jwt.sign(payload, "jcwd2204", { expiresIn: "1h" });
      //   console.log(token);

      res.status(200).send({
        token,
        message: "Login Succes",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  findAllUser: async (req, res) => {
    try {
      const users = await user.findAll();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
