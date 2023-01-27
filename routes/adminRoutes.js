const express = require("express")
const register = require("../controllers/auth")
const product = require("../controllers/addProduct")
const Accounts = require("../controllers/Accounts")
const {verifyAdmin} = require("../utilities/VerifyToken")
const UsersProducts = require("../controllers/addProduct")
const { check } = require('express-validator');

const Routers = express.Router()

Routers.route("/adminregister").post([
    check('email', 'Please include a valid email').isEmail(),
  ],register.adminRegister)
Routers.route("/adminlogin").post(register.adminlogin)

Routers.route("/createproduct/:adminId").post(verifyAdmin, product.newProduct)

Routers.route("/getallusers/:adminId").get(verifyAdmin, Accounts.getAllUser)

// Routers.route("/getalladmin/:adminId").get(verifyAdmin, Accounts.getAllAdmin)

Routers.route("/productupdate/:adminId/:productId").patch(verifyAdmin, UsersProducts.updateOneProduct)

Routers.route("/deleteproduct/:adminId/:productId").delete(verifyAdmin, UsersProducts.deleteOneProduct)

Routers.route("/getoneuser/:adminId/:userId").get(verifyAdmin, Accounts.getOneUser)

Routers.route("/updateuser/:adminId/:userId").patch(verifyAdmin, Accounts.getOneUser)

Routers.route("/deleteuser/:adminId/:userId").patch(verifyAdmin, Accounts.deleteOneUser)

module.exports = Routers