const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getBooks, getBookById, placeOrder, getMyOrders, getCart, updateCart, getWishlist, addToWishlist, removeFromWishlist, createBookReview, updateUserProfile } = require('../controllers/UsersController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/books', getBooks);
router.get('/book/:id', getBookById);
router.post('/place-order', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/cart', protect, getCart);
router.put('/cart', protect, updateCart);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:id', protect, addToWishlist);
router.delete('/wishlist/:id', protect, removeFromWishlist);
router.post('/book/:id/reviews', protect, createBookReview);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
