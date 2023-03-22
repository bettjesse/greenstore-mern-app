const express= require("express")
const router=  express.Router()

const { processPayment,getStripeApiKey } = require("../controllers/paymentController")
const { isAuthenticatedUser}= require("../middleware/auth")

router.route("/payment/process").post(processPayment)
router.route("/stripeapikey").get(getStripeApiKey)


module.exports = router