const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  
}));




app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(fileUpload());
app.use(morgan("tiny"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

//import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

module.exports = app;
