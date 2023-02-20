const Product = require("../models/product")
const connectDatabase = require("../config/database")
const products = require("../data/products")


connectDatabase()
const seedProducts = async ()=> {
    //adding all products to the database
    try{
        await Product.deleteMany()
        console.log("products are deleted ")
        await Product.insertMany(products)
        console.log("products are added ")

    } catch(error){
        console.log(error.message)
        process.exit()
    }
}
seedProducts()