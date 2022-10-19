const express = require("express");
const PORT = 2000;
const server = express();

server.use(express.json());
// middleware application-level
server.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to my API</h1>");
});

const { userRouter } = require("./routers");
server.use("/users", userRouter);

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
