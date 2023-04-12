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
         order
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
// exports.updateOrderById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await Order.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         error: 'Order not found'
//       });
//     }

//     if (order.deliveredAt) {
//       return res.status(400).json({
//         success: false,
//         error: 'Order has already been delivered'
//       });
//     }

// // 




//     order.deliveredAt = Date.now();
//     order.orderStatus = 'delivered';

//     await order.save();

//     for (const item of order.items) {
//       const product = await Product.findById(item.product);

//       if (product) {
//         product.stock -= item.quantity;

//         await product.updateOne({ stock: product.stock });
//       }
//     }

//     res.status(200).json({
//       success: true,
//       data: order
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       error: 'Server error'
//     });
//   }
// };

exports.updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

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

    if (status === 'shipped') {
      order.orderStatus = 'shipped';
    } else if (status === 'delivered') {
      order.orderStatus = 'delivered';
      order.shippedAt = Date.now();
    } else if (status === 'confirmed') {
      order.orderStatus = 'confirmed';
    } else if (status === 'pending') {
      order.orderStatus = 'pending';
    }  else {
      return res.status(400).json({
        success: false,
        error: 'Invalid order status'
      });
    }
    

    await order.save();

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


// Generate sales report for a given period of time


// Generate sales report for a given period of time
// exports.generateSalesReport = async (req, res) => {
//   const { startDate, endDate } = req.body;

//   try {
//     // Find all orders within the given date range
//     const orders = await Order.find({
//       paidAt: { $gte: startDate, $lte: endDate },
//       orderStatus: 'delivered' // Consider only delivered orders for sales report
//     });

//     // Calculate total sales amount
//     const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

//     // Get total number of orders and average order value
//     const totalOrders = orders.length;
 

//     // Get top selling products
//     const topSellingProducts = orders.reduce((items, order) => {
//       order.items.forEach(async item => {
//         try {
//           const existingProduct = await Product.findById(item.itemId);
//           if (existingProduct) {
//             existingProduct.quantity += item.quantity;
//             await existingProduct.save();
//           } else {
//             items.push({
//               productId: item.itemId,
//               quantity: item.quantity
//             });
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       });
//       return items;
//     }, []).sort((a, b) => b.quantity - a.quantity).slice(0, 5); // Get top 5 selling products
    
//     res.status(200).json({
//       success: true,
//       data: {
//         startDate,
//         endDate,
//         totalSales,
//         totalOrders,
//         // averageOrderValue,
//         topSellingProducts
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       error: 'Server error'
//     });
//   }
// };

exports.generateSalesReport = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    // Find all orders within the given date range
    const orders = await Order.find({
      paidAt: { $gte: startDate, $lte: endDate },
      orderStatus: 'delivered' // Consider only delivered orders for sales report
    });

    // Calculate total sales amount
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Get total number of orders and average order value
    const totalOrders = orders.length;
    const averageOrderValue = totalSales / totalOrders;

    // Create a list of products and their quantities
    // Get top selling products
const topSellingProducts = [];

for (const order of orders) {
  for (const item of order.items) {
    try {
      const existingProduct = await Product.findById(item.productId);
      if (existingProduct) {
        existingProduct.quantity += item.quantity;
        await existingProduct.save();
      } else {
        topSellingProducts.push({
          // productId: item.productId,
          quantity: item.quantity,
          name:item.name

        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const sortedProducts = topSellingProducts
  .sort((a, b) => b.quantity - a.quantity)
  .slice(0, 5);


    res.status(200).json({
      success: true,
      data: {
        startDate,
        endDate,
        totalSales,
        totalOrders,
        averageOrderValue,
        topSellingProducts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

