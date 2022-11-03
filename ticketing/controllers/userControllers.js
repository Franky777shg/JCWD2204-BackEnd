const db = require("../models");
const bcrypt = require("bcrypt");
const user = db.User;
const event = db.Event;
const transaction = db.Transaction;
const transactionDetail = db.TransactionDetail;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");

module.exports = {
  register: async (req, res) => {
    try {
      // console.log(req.body);
      const { email, username, password, phoneNumber, confirmPassword } =
        req.body;

      if (password !== confirmPassword) throw "password lu salah";

      if (password.length < 8) throw "Password min 8 character";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        username,
        email,
        phoneNumber,
        password: hashPass,
      });
      // console.log(data.id);

      const token = jwt.sign({ id: data.id }, "jcwd2204", { expiresIn: 30 });

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Verification User",
        html: `<a href="http://localhost:3000/verification/${token}" target="_blank">Click here to verify</a>`,
      });

      res.status(200).send("Register Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      const { data, password } = req.body;

      const isUserExist = await db.User.findOne({
        where: {
          [Op.or]: {
            email: data ? data : "",
            username: data ? data : "",
            phoneNumber: data ? data : "",
          },
        },
        raw: true,
      });
      console.log(isUserExist);

      if (isUserExist.loginAttempt >= 3) {
        await user.update(
          {
            isSuspend: true,
          },
          {
            where: {
              id: isUserExist.id,
            },
          }
        );

        throw `Account suspended because too many attempt`;
      } else {
        await user.update(
          {
            loginAttempt: 0,
          },
          {
            where: {
              id: isUserExist.id,
            },
          }
        );
      }

      if (!isUserExist) throw "User not found";

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) {
        await user.update(
          {
            loginAttempt: isUserExist.loginAttempt + 1,
          },
          {
            where: {
              id: isUserExist.id,
            },
          }
        );

        throw `Wrong Password ${isUserExist.loginAttempt + 1} attempts`;
      }

      const token = jwt.sign(
        { username: isUserExist.username, id: isUserExist.id },
        "jcwd2204"
      );

      res.status(200).send({
        user: {
          username: isUserExist.username,
          id: isUserExist.id,
        },
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      console.log(verify);
      const result = await user.findAll({
        where: {
          id: verify.id,
        },
      });

      res.status(200).send({
        id: result[0].id,
        username: result[0].username,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  viewAllEvent: async (req, res) => {
    try {
      const result = await event.findAll();

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  viewAvailableEvent: async (req, res) => {
    try {
      const result = await event.findAll({
        where: {
          quota: {
            [Op.gt]: 0,
          },
        },
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  buyTicket: async (req, res) => {
    try {
      const { userId, listEvent } = req.body;
      let totalPrice = 0;
      let listDataEvent = [];
      for (let item of listEvent) {
        const availability = await event.findOne({
          where: {
            id: item,
          },
          raw: true,
        });
        if (availability.quota === 0) {
          throw `${availability.name} is Sold Out`;
        }
        totalPrice += availability.price;
        listDataEvent.push(availability);
      }
      //   console.log(totalPrice);
      const trans = await transaction.create({
        totalPrice,
        UserId: userId,
      });
      for (let item of listEvent) {
        await transactionDetail.create({
          EventId: item,
          TransactionId: trans.id,
        });
      }
      console.log(listDataEvent);
      for (let item of listDataEvent) {
        await event.update(
          {
            quota: item.quota - 1,
          },
          {
            where: {
              id: item.id,
            },
          }
        );
      }
      res.status(200).send("Buy Ticket Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);

      await user.update(
        {
          profilePic: fileUploaded.filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getUser = await user.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getUser.id,
        username: getUser.username,
        profilePic: getUser.profilePic,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      console.log(verify);

      await user.update(
        {
          isVerified: true,
        },
        {
          where: {
            id: verify.id,
          },
        }
      );
      res.status(200).send("Success Verification");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
