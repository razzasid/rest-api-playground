const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const customerRoute = require("./routes/customers");
const menusRoute = require("./routes/menus");
const ordersRoute = require("./routes/orders");

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/menus", menusRoute);
app.use("/api/v1/orders", ordersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started at PORT: " + PORT));
