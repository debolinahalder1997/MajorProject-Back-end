const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema


const Product = new ProductSchema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    ProductImg: {
        type: String,
        require: true
    },
    ProductPrice: {
        type: String,
        require: true
    },
    category:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model("productDetails", Product)