const mongoose = require("mongoose");
require("dotenv").config();
const transactions_DB = mongoose.createConnection(
  process.env.mongo_connection, 
  { dbName: "transactionsDB",
    tls: true
  }
);
transactions_DB.on("connected", () => {
  console.log("Connection to transactions_DB successful!!");
});

transactions_DB.on("error", (err) => {
  console.error("Connection to transactions_DB failed!!", err);
});
module.exports = transactions_DB;