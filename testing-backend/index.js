const express = require("express");

const app = express();
app.use(express.json());

const { sequelize } = require("./lib/sequelize");
// sequelize.sync({ alter: true });

const { dogRoutes, productRoutes } = require("./routes");
app.use("/dogs", dogRoutes);
app.use("/products", productRoutes);

const port = 3000;
app.listen(port, () => console.log(`Running at port: ${port}`));
