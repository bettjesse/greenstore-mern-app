const express= require("express")
const router=  express.Router()

const { createOrder, getOrderById, myOrders } = require("../controllers/orderController")
const { isAuthenticatedUser,authorizeRoles}= require("../middleware/auth")
router.route("/order/new").post(isAuthenticatedUser, createOrder)
router.route("/order/:id").get(isAuthenticatedUser, getOrderById )
router.route("/orders/me").get(isAuthenticatedUser, myOrders )

module.exports = router