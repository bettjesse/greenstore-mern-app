const express= require("express")
const app = express()
const fileUpload = require('express-fileupload');
const cors = require('cors');


const session = require('express-session');

// Set up express-session middleware
app.use(session({
  secret: 'RCDKMDCNHGFYMWAJKDDURU375748DDHT37BF4DE4',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false
  }
}));


// ..

const bodyparser= require("body-parser")
const cloudinary= require("cloudinary")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update with your frontend URL
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// your API routes go here



const cookieParser= require("cookie-parser")

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"));
app.use(cookieParser())
app.use(fileUpload())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));


//
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})
//import all routes
const products=  require("./routes/product")
const auth= require("./routes/auth")
const payment= require("./routes/payment")
const order= require("./routes/order")


app.use("/api/v1", products)
app.use("/api/v1", auth)
app.use("/api/v1", payment)
app.use("/api/v1", order)



module.exports= app