const express = require('express')
const router = express.Router()

const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const sellerRouter = require('./sellerRoutes')

// /api/user
router.use('/user',userRouter)

// /api/admin
router.use('/admin',adminRouter)

// / 
router.use('/seller',sellerRouter)





module.exports = router