const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser')
const {getAllProducts,getProductById,getProductsByCategory} = require('../controllers/productController');

// get all products
router.get('/', authUser , getAllProducts);

//get a product by ID
router.get('/:id', authUser , getProductById);

//get products by category
router.get('/category/:category', authUser , getProductsByCategory);

module.exports = router;

