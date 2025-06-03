const User = require('../models/userModel')
const Product = require('../models/productModel');
const bcrypt = require('bcrypt')
const createToken = require('../utils/generateToken');

//login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email })

        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ error: "Admin not found" })
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, admin.password)

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid password" })
        }

        const token = createToken(admin._id, admin.role);
        const adminObject = admin.toObject();
        delete adminObject.password; 

        res.status(200).json({message: "Admin login successful",
            adminObject,
            token
        });

            
    } catch (error) {
         console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    
    }
}

//logout
const adminLogout = async (req, res) =>{
    try {
        res.clearCookie("token");
    res.status(200).json({ success: true, message: "Admin logged out successfully" }) 

    } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Something went wrong" })
    }
}


 //delete
 const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


//Get Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('sellerId', 'name email');
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

//delete prodcut
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleted = await Product.findByIdAndDelete(productId);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


module.exports = { adminLogin, adminLogout,deleteUser, getAllUsers,getAllProducts, deleteProduct};