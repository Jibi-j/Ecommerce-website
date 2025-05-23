const express = require('express');
const router = express.Router();
const { sellerLogin, sellerProfile, sellerLogout } = require('../controllers/sellerController');
const { authSeller } = require('../middlewares/authSeller');


router.post('/login', sellerLogin);


router.get('/profile', authSeller, sellerProfile);
router.post('/logout', authSeller, sellerLogout);

module.exports = router;
