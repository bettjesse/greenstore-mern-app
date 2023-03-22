const express= require("express")
const router=  express.Router()

const { createOrder, getOrderById, myOrders, getOrders, updateOrderById, deleteOrderById } = require("../controllers/orderController")
const { isAuthenticatedUser,authorizeRoles}= require("../middleware/auth")
router.route("/order/new").post(isAuthenticatedUser, createOrder)
router.route("/order/:id").get(isAuthenticatedUser, getOrderById )
router.route("/orders/me").get(isAuthenticatedUser, myOrders )
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getOrders )
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderById )
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrderById )


module.exports = router