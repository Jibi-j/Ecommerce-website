const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser')

const { createReview , getProductReviews, updateReview, deleteReview} = require('../controllers/reviewController')


//api review
router.post('/', authUser, createReview)
router.get('/:productId', getProductReviews)
router.put('/:id',authUser,updateReview)
router.delete('/:id', authUser, deleteReview)



module.exports = router;