const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const deleteUser = require("./controllers/deleteUser");
const userRoutes = express.Router();


userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);8
userRoutes.delete("/deleteuser", deleteUser);


userRoutes.use(auth);

  


userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
