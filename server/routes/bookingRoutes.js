const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const { isAuth } = require('../middlewares/auth/isAuth');

router.post('/create-booking', isAuth, bookingController.createBooking);
router.get('/get-user-bookings', isAuth, bookingController.getUserBookings);
router.post('/cancel-booking/:bookingId', isAuth, bookingController.cancelBooking)


module.exports = router;