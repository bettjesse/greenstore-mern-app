const express = require("express")
const router= express.Router()
const { getProducts , newProduct, getSingleProduct, updateProductById, deleteProduct, getAdminProducts} = require("../controllers/productController")

const{ isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")

router.route("/products").get(getProducts)
router.route("/admin/products").get(getAdminProducts)
//getting single product data route
router.route("/product/:id").get(getSingleProduct)
// posting new product in the databse
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),newProduct)
router.route("/admin/product/:id")
                                 .put(isAuthenticatedUser,authorizeRoles("admin"),updateProductById)
                                 .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)

module.exports = router
