const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getBooks,
    getBookById,
    createBookReview,
    deleteBook,
    createBook,
    updateBook
} = require('../controllers/bookController');

router.route('/').get(getBooks).post(protect, admin, createBook);
router.route('/:id')
    .get(getBookById)
    .delete(protect, admin, deleteBook)
    .put(protect, admin, updateBook);
router.route('/:id/reviews').post(protect, createBookReview);

module.exports = router;
