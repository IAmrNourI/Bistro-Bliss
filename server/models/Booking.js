const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  date_time: {
    type: Date,
    required: [true, "date is required"],
  },
  totalPerson:{
    type: Number,
    required: [true, "total Person is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Completed"],
    default: "Pending",
    required: [true, "status is required"],
  },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;

