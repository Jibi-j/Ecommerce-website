const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    // Check role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "User not authorized" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authAdmin;
