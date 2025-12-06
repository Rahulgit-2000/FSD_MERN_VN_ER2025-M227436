const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengers, seatClass, seats, paymentMethod, extras } = req.body;

    // Find flight
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    // Check availability
    if (flight.availableSeats < passengers) {
      return res.status(400).json({
        success: false,
        message: 'Not enough seats available'
      });
    }

    // Find class price
    const classInfo = flight.classes.find(c => c.className === seatClass);
    const pricePerSeat = classInfo ? classInfo.price : flight.basePrice;
    const totalPrice = pricePerSeat * passengers;

    // Get user info
    const user = await User.findById(req.user.id);

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      flightId: flight._id,
      flightName: flight.flightName,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureTime,
      passengers,
      seatClass,
      seats: seats || [],
      price: pricePerSeat,
      totalPrice,
      paymentMethod,
      journeyDate: flight.departureTime,
      email: user.email,
      mobile: user.profile?.phone || '',
      extras: extras || {}
    });

    // Update flight availability
    flight.availableSeats -= passengers;
    if (classInfo) {
      classInfo.availableSeats -= passengers;
    }
    await flight.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating booking'
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('flightId')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching bookings'
    });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'username email')
      .populate('flightId')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching bookings'
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'username email profile')
      .populate('flightId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.userId._id.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching booking'
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (booking.userId.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // If rejecting, restore seats
    if (status === 'rejected' && booking.status !== 'rejected') {
      const flight = await Flight.findById(booking.flightId);
      if (flight) {
        flight.availableSeats += booking.passengers;
        const classInfo = flight.classes.find(c => c.className === booking.seatClass);
        if (classInfo) {
          classInfo.availableSeats += booking.passengers;
        }
        await flight.save();
      }
      booking.paymentStatus = 'refunded';
    }

    booking.status = status || booking.status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating booking'
    });
  }
};

// @desc    Reschedule booking
// @route   PUT /api/bookings/:id/reschedule
// @access  Private
exports.rescheduleBooking = async (req, res) => {
  try {
    const { newFlightId, newClass } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check authorization
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Find new flight
    const newFlight = await Flight.findById(newFlightId);
    if (!newFlight) {
      return res.status(404).json({ success: false, message: 'New flight not found' });
    }

    // Check availability on new flight
    if (newFlight.availableSeats < booking.passengers) {
      return res.status(400).json({ success: false, message: 'Not enough seats on new flight' });
    }

    // Restore seats on old flight
    const oldFlight = await Flight.findById(booking.flightId);
    if (oldFlight) {
      oldFlight.availableSeats += booking.passengers;
      const oldClassInfo = oldFlight.classes.find(c => c.className === booking.seatClass);
      if (oldClassInfo) {
        oldClassInfo.availableSeats += booking.passengers;
      }
      await oldFlight.save();
    }

    // Update new flight seats
    newFlight.availableSeats -= booking.passengers;
    const newClassInfo = newFlight.classes.find(c => c.className === (newClass || booking.seatClass));
    if (newClassInfo) {
      newClassInfo.availableSeats -= booking.passengers;
    }
    await newFlight.save();

    // Update booking details
    booking.flightId = newFlight._id;
    booking.flightName = newFlight.flightName;
    booking.origin = newFlight.origin;
    booking.destination = newFlight.destination;
    booking.departureTime = newFlight.departureTime;
    booking.journeyDate = newFlight.departureTime;
    booking.seatClass = newClass || booking.seatClass;

    // Recalculate price
    const pricePerSeat = newClassInfo ? newClassInfo.price : newFlight.basePrice;
    booking.price = pricePerSeat;
    booking.totalPrice = pricePerSeat * booking.passengers;

    // Reset status to pending for approval if needed, or keep confirmed?
    // Let's keep it confirmed if it was confirmed, or pending if it was pending.
    // Actually, usually rescheduling might need re-approval, but let's assume auto-approval for now if paid.
    // But wait, price difference?
    // For simplicity, we assume price adjustment is handled or ignored for this MVP task unless specified.
    // The prompt says "change dates", implying rescheduling.

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking rescheduled successfully',
      data: booking
    });

  } catch (error) {
    console.error('Reschedule booking error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error rescheduling booking' });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (booking.userId.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    // Restore flight seats
    const flight = await Flight.findById(booking.flightId);
    if (flight) {
      flight.availableSeats += booking.passengers;
      const classInfo = flight.classes.find(c => c.className === booking.seatClass);
      if (classInfo) {
        classInfo.availableSeats += booking.passengers;
      }
      await flight.save();
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error cancelling booking'
    });
  }
};
