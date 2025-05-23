const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
     title:{
        type: String,
        required: [true, 'Product title is required']
     },
     description:{
        type:String
     },
     price:{
        type:Number,
        required: [true, 'Price is required']
     },
     stock:{
        type:Number,
        required:true,
        default:0
     },
     category:{
        type:String,
        default: null
     },
     sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
     }
    }, {
        timestamps:true

})
module.exports = mongoose.model('Product', productSchema)