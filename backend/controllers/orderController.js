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
  // Get a list of all orders
  exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  
    res.status(200).json({
      success: true,
      data: {
        orders,
        totalAmount
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

// Update an order by ID
exports.updateOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.deliveredAt) {
      return res.status(400).json({
        success: false,
        error: 'Order has already been delivered'
      });
    }

    order.deliveredAt = Date.now();
    order.orderStatus = 'delivered';

    await order.save();

    for (const item of order.items) {
      const product = await Product.findById(item.product);

      if (product) {
        product.stock -= item.quantity;

        await product.updateOne({ stock: product.stock });
      }
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

// Delete an order by ID
exports.deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    await order.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};