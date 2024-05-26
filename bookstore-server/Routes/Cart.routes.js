const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/Cart.controller');
const authMiddleware = require('../Middlewares/authenticateUser');

// Add item to cart
router.post('/api/addtocart', authMiddleware, cartController.addToCart);

// Get cart items
router.get('/api/cart', authMiddleware, cartController.getCartItems);
router.get('/api/clearcart',authMiddleware,cartController.clearCart);
router.delete('/api/removeitem/:id',authMiddleware,cartController.removeItem);
module.exports = router;
