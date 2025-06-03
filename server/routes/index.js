const express = require('express')
const router = express.Router()

const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const sellerRouter = require('./sellerRoutes')
const cartRoutes = require('./cartRoutes');
const reviewRoutes = require('./reviewRoutes')
const productRoutes = require('./productRoutes');

// /api/user
router.use('/user',userRouter)

// /api/admin
router.use('/admin',adminRouter)

// / seller
router.use('/seller',sellerRouter)

// api/cart
router.use('/cart', cartRoutes)

//api /review
router.use('/review',reviewRoutes)

//productRouter
router.use('/products', productRoutes)


module.exports = router