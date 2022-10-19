const express = require("express");
const PORT = 2000;
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to my API</h1>");
});

// register new user
server.post("/register", (req, res) => {});

server.get("/all-user", (req, res) => {
  res.status(200).send(database);
});

// server.post("/userById/:id", (req, res) => {
//   //   console.log(req.params.id);
//   let result = database.filter((item) => item.id === +req.params.id);
//   res.status(200).send(result[0]);
// });

// delete user by id
// server.delete("/delete/:id", (req, res) => {
//   let id = database.findIndex((item) => item.id !== +req.params.id);
//   //   console.log(id);
//   database.splice(id, 1);
//   res.status(200).send(database);
// });

// edit user by id
// server.patch("/edit/:id", (req, res) => {
//   let user = database.filter((item) => item.id === +req.params.id)[0];
//   console.log(user);
//   console.log(req.body);
//   //   let propBody = Object.keys(req.body);
//   //   let propData = Object.keys(user);

//   //   propBody.map((item) => {
//   //     if (propData.indexOf(item) !== -1) {
//   //       user[item] = req.body[item];
//   //     }
//   //   });
//   for (let keys in user) {
//     if (req.body[keys]) {
//       user[keys] = req.body[keys];
//     }
//   }
//   console.log(user);
//   console.log(database);
//   res.status(200).send(database);
// });

// contoh middleware
server.get(
  "/middleware",
  (req, res, next) => {
    console.log("response from middleware");
    next();
  },
  (req, res) => {
    res.send("response from last handler");
  }
);

const { userRouter } = require("./routers");
server.use("/users", userRouter);

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
