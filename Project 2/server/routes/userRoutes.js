const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, createUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .delete(deleteUser);

module.exports = router;
