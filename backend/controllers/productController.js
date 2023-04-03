const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require ("cloudinary")

//create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
  console.log(req.body);
// if (!req.body.name || !req.body.price || !req.body.description || !req.body.category || !req.body.images) {
//   return res.status(400).json({ message: 'Missing required fields' });
// }

  try {
    // Extract images array from request body
    let images = [];
    console.log('req.body.images:', req.body.images);
    console.log('typeof req.body.images:', typeof req.body.images);
    
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images;
      
    } else {
      throw new Error('Invalid images format');
    }

    let imagesLinks = [];

    // Upload each image to Cloudinary and get its URL and public ID
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], { folder: 'my-folder' });
      console.log(result)
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      });
     
    }

    // Add user ID to request body
    req.body.user = req.user.id;

    // Replace images array in request body with the image URLs and public IDs
    req.body.images = imagesLinks;

    // Save the product to the database
    const product = await Product.create(req.body);

    // Return the new product with a success status
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




// get all products admion => /api/v1/admin/products
exports.getAdminProducts= async (req,res,next) => {
  const products= await Product.find()
  res.status(200).json({
    success: true,
    products
  })
}


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
