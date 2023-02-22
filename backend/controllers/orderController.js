const Order = require('../models/order');
const Product= require("../models/product")

// Create a new order
exports.createOrder = async (req, res) => {
  const { shipping, items, paymentInfo, itemsPrice, shippingPrice, totalPrice } = req.body;

  try {
    const order = await Order.create({
      shipping,
      
      items,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now()
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
//get single order
exports.getOrderById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id).populate('user', 'name email');
  
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
  };
  //get logged in user order
  // Get all orders for logged-in user
  exports.myOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id })
  
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  };
  