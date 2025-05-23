const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//login
const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const seller = await User.findOne({ email, role: 'seller' });

        if (!seller) return res.status(404).json({ message: "Seller not found" });

        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: seller._id, role: seller.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Seller login successful",
            token,
            seller: {
                id: seller._id,
                name: seller.name,
                email: seller.email,
                role: seller.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Login error", error: error.message });
    }
};

//profile
const sellerProfile = async (req, res) => {
    try {
        const seller = await User.findById(req.user.id).select('-password');
        if (!seller) return res.status(404).json({ message: "Seller not found" });
        res.json({ data: seller, message: "Seller profile retrieved" });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile", error: error.message });
    }
};

// logout
const sellerLogout = async (req, res) => {
    try {

        res.status(200).json({ success: true, message: "Seller logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Logout failed", error: error.message });
    }
};

module.exports = { sellerLogin, sellerProfile, sellerLogout };




