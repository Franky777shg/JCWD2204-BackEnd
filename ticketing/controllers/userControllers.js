const db = require("../models");
const bcrypt = require("bcrypt");
const user = db.User;
const event = db.Event;
const transaction = db.Transaction;
const transactionDetail = db.TransactionDetail;
const { Op, Transaction } = require("sequelize");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, password, phoneNumber, confirmPassword } =
        req.body;

      if (password !== confirmPassword)
        throw "password doesnt match with confirm password";

      if (password.length < 8) throw "Password min 8 character";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      await user.create({
        username,
        email,
        phoneNumber,
        password: hashPass,
      });

      res.status(200).send("Register Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, username, password, phoneNumber } = req.body;

      const isUserExist = await db.User.findOne({
        where: {
          [Op.or]: {
            email: email ? email : "",
            username: username ? username : "",
            phoneNumber: phoneNumber ? phoneNumber : "",
          },
        },
      });

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

        throw `Wrong Password ${isUserExist.loginAttempt} attempts`;
      }

      res.status(200).send(isUserExist);
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
    // try {
    //   const { userId, listEvent } = req.body;
    //   let totalPrice = 0;
    //   let listQuota = []
    //   for (let item of listEvent) {
    //     const availability = await event.findOne({
    //       where: {
    //         id: item,
    //       },
    //       raw: true,
    //     });
    //     if (availability.quota === 0) {
    //       throw `${availability.name} is Sold Out`;
    //     }
    //     totalPrice += availability.price;
    //     listQuota.push(availability.quota)
    //   }
    //   //   console.log(totalPrice);
    //   const result = await Transaction(async (t) => {
    //     const trans = await transaction.create(
    //       {
    //         totalPrice,
    //         UserId: userId,
    //       },
    //       { transaction: t }
    //     );
    //     for (let item of listEvent) {
    //       await transactionDetail.create(
    //         { EventId: item, TransactionId: trans.id },
    //         { transaction: t }
    //       );
    //     }
    //     for(let item of listEvent) {
    //         await event.update({
    //             quota:
    //         },
    //         {
    //             where: {
    //                 id: item
    //             }
    //         })
    //     }
    //   });
    //   res.status(200).send("Buy Ticket Success");
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
