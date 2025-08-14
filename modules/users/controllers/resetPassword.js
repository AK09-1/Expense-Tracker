const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");
const users_DB = require("../../../Connections/users");

const resetPassword = async (req, res) => {
  const usersModel = users_DB.model("users");


  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required";
  if (!new_password) throw "Please provide new password!";
  if (!reset_code) throw "Reset code is required!";
  if (new_password.length < 5)
    throw "Password must be at least 5 characters long!";

  
  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code does not match!";
  
  const hashedPassword = await bcrypt.hash(new_password, 12);
  
  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "5678",
    },
    {
      runValidators: true,
    }
  );

  
  await emailManager(
    email,
    "Your password has been reseted If you didnt do this, contact us",    
    "Password reseted successfuly"
  );
  res.status(200).json({
    status: "success",
    message: "Password reseted succesfully!",
  });
};

module.exports = resetPassword;
