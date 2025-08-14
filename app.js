require("express-async-errors");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
const users_DB = require("./Connections/users");
const transactions_DB = require("./Connections/transactions");


require("dotenv").config();

require("./models/users.model");
require("./models/transactions.model");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);


app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Error 404 not found",
  });
});

app.use(errorHandler);

app.listen(7000, () => {
  console.log("Server started successfully");
});


 