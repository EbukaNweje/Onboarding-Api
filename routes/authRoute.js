const express = require("express")
const register = require("../controllers/auth")
const { check } = require('express-validator');
const {verifyToken} =  require('../utilities/VerifyToken') 


const Routers = express.Router()

Routers.route("/register").post([
    check('email', 'Please include a valid email').isEmail(),
  ],register.register)
Routers.route("/login").post(register.login)

Routers.route("/verifyuser/:id/:token").post(register.verify)
Routers.route("/forgotpassword/").post(register.forgotpassword);
Routers.route("/resetpassword/:id/:token").post(verifyToken, register.resetPassword);



module.exports = Routers