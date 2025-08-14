const mongoose = require("mongoose");
const transactions_DB = require("../../../Connections/transactions");
const users_DB = require("../../../Connections/users");
const userDashboard = async (req, res) => {
  const usersModel = users_DB.model("users");  
  const transactionsModel = transactions_DB.model("transactions");
  const {user_id}=req.body;  
  const getUser = await usersModel
    .findOne({
      _id: user_id,
    })
    .select("-password");
  const transactions = await transactionsModel
    .find({
      user_id: user_id,
    })
    .sort("-createdAt")
    .limit(2);

  res.status(200).json({
    status: "success",
    data: getUser,
    transactions,
  });
};

module.exports = userDashboard;
