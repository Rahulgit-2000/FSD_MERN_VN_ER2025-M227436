const express = require('express');
const router = express.Router();
const { loginAdmin, getUsers, getSellers, deleteUser, deleteSeller, deleteBook, getUserById, updateUser, createUser, getSellerById, updateSeller, createSeller, getAllOrders, approveSeller, updateUserRating, updateSellerRating, updateOrderToPaid, updateOrderToDelivered, getDashboardStats } = require('../controllers/AdminControllers');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/login', loginAdmin);
router.get('/users', protect, admin, getUsers);
router.get('/sellers', protect, admin, getSellers);
router.delete('/user/:id', protect, admin, deleteUser);
router.delete('/seller/:id', protect, admin, deleteSeller);
router.delete('/book/:id', protect, admin, deleteBook);
router.get('/user/:id', protect, admin, getUserById);
router.put('/user/:id', protect, admin, updateUser);
router.post('/user', protect, admin, createUser);

router.get('/seller/:id', protect, admin, getSellerById);
router.put('/seller/:id', protect, admin, updateSeller);
router.put('/seller/approve/:id', protect, admin, approveSeller);
router.put('/user/rating/:id', protect, admin, updateUserRating);
router.put('/seller/rating/:id', protect, admin, updateSellerRating);
router.post('/seller', protect, admin, createSeller);
router.get('/orders', protect, admin, getAllOrders);
router.put('/order/:id/pay', protect, admin, updateOrderToPaid);
router.put('/order/:id/deliver', protect, admin, updateOrderToDelivered);
router.get('/stats', protect, admin, getDashboardStats);

module.exports = router;
