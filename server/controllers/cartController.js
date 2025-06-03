const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

//get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      cart,
    });
  } catch (error) {
    console.error('Error getting cart:', error.message);
   
  }
};

//Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const itemQuantity = quantity || 1;
    const price = product.price;
    const totalprice = price * itemQuantity;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({ userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += itemQuantity;
      cart.items[existingItemIndex].totalprice = cart.items[existingItemIndex].quantity * price;
    } else {
      // Add new item
      cart.items.push({ productId, quantity: itemQuantity, price, totalprice });
    }

    await cart.save();

    res.status(200).json({ success: true, message: "Product added to cart", cart });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

//Remove product from cart
  const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }
    
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items = updatedItems;

    //Recalculate total price 
    cart.items = cart.items.map((item) => ({
      ...item,
      totalprice: item.quantity * item.price,
    }));

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });

  } catch (error) {
    console.error("Remove from cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error removing from cart",
      error: error.message,
    });
  }
};

//clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message,
    });
  }
};



module.exports = { addToCart,removeFromCart, getCart, clearCart}






