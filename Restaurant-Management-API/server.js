const express = require("express");
const connectDB = require("./db");
const chechAuth = require("./middleware/authMiddleware");
require("dotenv").config();

const customerRoute = require("./routes/customers");
const menusRoute = require("./routes/menus");
const ordersRoute = require("./routes/orders");
const authRoute = require("./routes/auth");

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/customers", chechAuth, customerRoute);
app.use("/api/v1/menus", chechAuth, menusRoute);
app.use("/api/v1/orders", chechAuth, ordersRoute);

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started at PORT: " + PORT));
module.exports = app;
