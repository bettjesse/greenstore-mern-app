const express = require("express")
const router= express.Router()
const { getProducts , newProduct, getSingleProduct, updateProductById, deleteProduct} = require("../controllers/productController")

const{ isAuthenticatedUser} = require("../middleware/auth")

router.route("/products").get(  getProducts)
//getting single product data route
router.route("/product/:id").get(getSingleProduct)
// posting new product in the databse
router.route("admin/product/new").post(isAuthenticatedUser,newProduct)
router.route("/admin/product/:id")
                                 .put(isAuthenticatedUser,updateProductById)
                                 .delete(isAuthenticatedUser,deleteProduct)

module.exports = router
