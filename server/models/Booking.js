const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  date_time: {
    type: Date,
    required: [true, "date is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Completed"],
    default: "Pending",
    required: [true, "status is required"],
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;

