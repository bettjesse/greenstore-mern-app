const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    shipping: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }],

    paymentInfo:{
   id:{
    type: String
   },
   status:{
    type: String
   },

    },
    paidAt: {
        type: Date,
        default: Date,
      },
    itemsPrice: {
      type: Number,
      required: true,
      default:0,
    },
    shippingPrice:{
type: Number,
required: true,
default:0
    },
    totalPrice:{
type: Number,
required: true,
default:0
    },
    
    orderStatus: {
      type: String,
      default: "processing",
    },
    deliveredAt: {
        type: Date,
       
      },
    createdAt: {
        type: Date,
        default: Date.now
      },
  });
  
  const Order = mongoose.model('Order', orderSchema);

module.exports = Order;