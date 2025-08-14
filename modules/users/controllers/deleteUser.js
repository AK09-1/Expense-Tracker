const mongoose = require("mongoose");
const transactions_DB = require("../../../Connections/transactions");
const users_DB = require("../../../Connections/users");
const deleteUser = async (req, res) => {
  const usersModel = users_DB.model("users");  
  const transactionsModel = transactions_DB.model("transactions");
  const { email} = req.body;
    if (!email) throw "Email must be provided!";
   const deleteUsers = await usersModel.findOne({
    email: email,
  });
    if (!deleteUsers) throw "User not found!";
    else{
  const deletetransactions = await transactionsModel
    .find({
      user_id: deleteUsers._id,
    })
    if (!deletetransactions) throw "No Transactions found for this user!";
    else
    await transactionsModel.deleteMany({ user_id: deleteUsers._id });
    await usersModel.deleteOne({ _id: deleteUsers._id });
    
    

  res.status(200).json({
    status: "Users and all it's transactions deleted successfully",    
  });
}
};

module.exports = deleteUser;
