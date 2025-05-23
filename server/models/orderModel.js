const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount:{
        type: String,
        enum:['pending','paid','failed'],
        default:'pending'
    },
    status:{
        type:String,
        enum:['processing','shipped','delivered','cancelled'],
        default:'processing'
    },
    purchasedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('order', orderSchema)
