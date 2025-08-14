const mongoose = require("mongoose");
require("dotenv").config();
const users_DB = mongoose.createConnection(
  process.env.mongo_connection, 
  { dbName: "usersDB",
    useNewUrlParser: true,
  useUnifiedTopology: true,
  }
);
users_DB.on("connected", () => {
  console.log("Connection to users_DB successful!!");
});

users_DB.on("error", (err) => {
  console.error("Connection to users_DB failed!!", err);
});
module.exports = users_DB;