const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");

//create new product => /api/v1/product/new
exports.newProduct= async (req,res,next) => {
  try {
    const product =  await Product.create(req.body);
    res.status(201).json({
      success: true,
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// get all products=> /api/v1/products
exports.getProducts = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = req.query.limit || 10;

    const features = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      

    const products = await features.query;
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//getSingle product detail 
exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id.trim(); // trim the id value
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
  
// update product => /api/v1/admin/product/:id
exports.updateProductById = async (req, res, next) => {
  try {
    const id = req.params.id.trim(); // trim the id value
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// delete product => /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id.trim(); // trim the id value
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
