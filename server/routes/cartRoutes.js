const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser')

const { addToCart, removeFromCart, getCart, clearCart } = require('../controllers/cartController');

router.use(authUser)


router.post('/add', addToCart);
//remove fromcart
router.delete('/remove/:productId',authUser, removeFromCart)

router.get('/get', authUser, getCart)
//clear cart
router.delete('/clear', authUser, clearCart)





module.exports = router;