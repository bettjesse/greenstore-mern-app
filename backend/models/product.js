const mongoose = require("mongoose")
const productSchema=  new mongoose.Schema({

    //defining the database schema for the "product" collection in MongoDB

    name: {
        type: String,
        required:[ true , "please enter product name"],
        // remove unwanted space
        trim : true,
        maxLength:[100]
    },
    price: {
        type: Number ,
        required:[ true],
      maxLength:[5]
    },
    description: {
        type: String,
        required:[ true , "please enter product description"],
       
    },
    rating: {
        type: Number,
      
        default:0
       
    },
    images : [
        //using 3rd party cloudinary to store images 
        {
            public_id :{
                type: String,
                required: true
            },
            url :{
                type: String,
                required: true
            },

        },
        
        
        
    ],
    seller: {
        type: String,
        required:[ true , "please enter product seller"],
       
        maxLength:[100]
    },
    stock:{
        type: Number,
        required:[ true , "please enter product stock"],
        default: 0
    }


})
// exporting it as a Mongoose model that can be used to interact with the database
module.exports=  mongoose.model("product", productSchema)