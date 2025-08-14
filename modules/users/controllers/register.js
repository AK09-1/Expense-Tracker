const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
const nodemailer = require("nodemailer");
const emailManager = require("../../../managers/emailManager");
const users_DB = require("../../../Connections/users");

const register = async (req, res) => {
  const usersModel = users_DB.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  

  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 5) throw "Password must be at least 5 characters long.";

  if (!name) throw "Name is required";
  if (password !== confirm_password)
    throw "Password and confirmed password doesnot match!";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists!";

  
  const hashedPassword = await bcrypt.hash(password, 12); 

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser); 
  await emailManager(
    createdUser.email,
    "welcome to expense tracker",
    "We are glad to have you on board!"   
  );
  res.status(201).json({
    status: "User registered successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
