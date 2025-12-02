const express = require('express');
const router = express.Router();
const { registerSeller, loginSeller, addBook, getMyBooks, updateBook, deleteBook, getSellerOrders, updateSellerProfile, getSellerStats } = require('../controllers/SellerControllers');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.post('/add-book', protect, upload.single('itemImage'), addBook); // Assuming image upload
router.get('/my-books', protect, getMyBooks);
router.put('/update-book/:id', protect, updateBook);
router.delete('/delete-book/:id', protect, deleteBook);
router.get('/orders', protect, getSellerOrders);
router.put('/profile', protect, updateSellerProfile);
router.get('/stats', protect, getSellerStats);

module.exports = router;
