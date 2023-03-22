const stripe = require('stripe')("sk_test_51MlndeEGaG54q0rrq62rWJx9TluPdBzJT5zw865Ww1KMvHUZihmYMIg2w8I08maHPYjr4nuZe5NHNjZWWGWnWl9S00azPCx1pb");

// Function to get Stripe API key
exports.getStripeApiKey = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      stripeApiKey: process.env.STRIPE_API_KEY
    });
  } catch (error) {
    console.log('Error while getting Stripe API key: ', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error while getting Stripe API key',
      error: error.message
    });
  }
}

// Process Stripe payments
// Process Stripe payments
exports.processPayment = async (req, res, next) => {
  try {
    

    // Create a PaymentIntent with amount and currency
    const intent = await stripe.paymentIntents.create({
      amount:req.body.amount,
      currency: 'kes',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ client_secret: intent.client_secret });
  } catch (error) {
    next(error);
  }
};
