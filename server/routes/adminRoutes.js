const express = require('express');
const router = express.Router();

const { adminLogin, adminLogout, deleteUser} = require('../controllers/adminController');

const authAdmin = require('../middlewares/authAdmin');

// Admin Login
router.post('/login', adminLogin);

// Admin Logout
router.post('/logout', authAdmin, adminLogout);


// Delete a User by ID (admin-only)
router.delete('/user/:id', authAdmin, deleteUser);

module.exports = router;




