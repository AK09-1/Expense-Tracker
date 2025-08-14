const mongoose = require("mongoose");
const transactions_DB = require("../../../Connections/transactions");
const users_DB = require("../../../Connections/users");

const getTransactions = async (req, res) => {
  const transactionModel = transactions_DB.model("transactions");
  console.log(req.params); 
  const transactions = await transactionModel.find({
    _id : req.params
  });
  
  res.status(200).json({
    status: "success",
    data:
      transactions.length > 0
        ? transactions
        : "no transactions yet, try to add some income or expense",
  });
};

module.exports = getTransactions;
