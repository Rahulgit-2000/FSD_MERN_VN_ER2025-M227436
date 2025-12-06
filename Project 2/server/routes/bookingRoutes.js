const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  rescheduleBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// All booking routes require authentication
router.use(protect);

// User routes
router.post('/', createBooking);
router.get('/my-bookings', getMyBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.put('/:id/reschedule', rescheduleBooking);
router.delete('/:id', cancelBooking);

// Admin routes
router.get('/', authorize('admin'), getAllBookings);

module.exports = router;
