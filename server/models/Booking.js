const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  date: {
    type: Date,
    required: [true, "date is required"],
  },
  time: {
    type: Date,
    required: [true, "time is required"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
    required: [true, "status is required"],
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;

