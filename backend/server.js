const app = require("./app")
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")

// setting up config file

dotenv.config({path:"backend/config/config.env"})

// conecting to database
connectDatabase()


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
  })
app.listen(process.env.PORT,()=> {
    console.log(`server started on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})