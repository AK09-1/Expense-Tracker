const mongoose = require("mongoose");
const transactions_DB = require("../Connections/transactions.js");
const users_DB = require("../Connections/users.js");

const transactionsSchema = new mongoose.Schema(
  {
    
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    transaction_type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = transactions_DB.model("transactions", transactionsSchema);

module.exports = transactionsModel;
