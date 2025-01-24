const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const { isAuth } = require("../middlewares/auth/isAuth");
const isRole = require("../middlewares/auth/isRole");
const {
  createBookingValidationRules,
  statusValidationRules,
} = require("../middlewares/validation/bookingValidation");

const {
  valdationResults,
} = require("../middlewares/validation/validationResult");

router.post(
  "/create-booking",
  isAuth,
  createBookingValidationRules,
  valdationResults,
  bookingController.createBooking
);

router.get("/get-user-bookings", isAuth, bookingController.getUserBookings);

router.post(
  "/cancel-booking/:bookingId",
  isAuth,
  statusValidationRules("Pending"),
  bookingController.cancelBooking
);

router.get(
  "/get-pending-bookings",
  isAuth,
  isRole("admin"),
  bookingController.getPendingBookings
);

router.post(
  "/accept-booking/:bookingId/:userId",
  isAuth,
  isRole("admin"),
  bookingController.acceptBooking
);

router.post(
  "/reject-booking/:bookingId/:userId",
  isAuth,
  isRole("admin"),
  bookingController.rejectBooking
);

router.get(
  "/get-all-bookings",
  isAuth,
  isRole("admin"),
  bookingController.getAllBookings
);

router.get(
    "/get-upcoming-bookings",
    isAuth,
    isRole("admin"),
    bookingController.getUpcomingBookings
)
module.exports = router;
