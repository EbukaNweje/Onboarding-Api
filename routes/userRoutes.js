const express = require("express")
const UsersProducts = require("../controllers/addProduct")

const Routers = express.Router()

Routers.route("/allproduct").get(UsersProducts.getAllProduct)
Routers.route("/product/:productId").get(UsersProducts.getOneProduct)

module.exports = Routers