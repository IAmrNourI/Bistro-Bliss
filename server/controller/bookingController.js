const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { date_time, totalPerson } = req.body;
    const userId = req.user.id;
    console.log(userId);
    const newBooking = new Booking({ user: userId, date_time, totalPerson });
    await newBooking.save();
    return res.status(200).json({
      message: "Booking created successfully",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).select(
      "date_time status"
    );
    return res
      .status(200)
      .json({ message: "User's bookings", data: bookings, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "Cancelled";
    await booking.save();
    return res
      .status(200)
      .json({ message: "Booking cancelled successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.getPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "Pending" })
      .populate("user", "name _id")
      .select("date_time status");
    return res
      .status(200)
      .json({ message: "Pending bookings", data: bookings, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "Accepted";
    await booking.save();
    return res
      .status(200)
      .json({ message: "Booking accepted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "Rejected";
    await booking.save();
    return res
      .status(200)
      .json({ message: "Booking rejected successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name -_id")
      .select("date_time status")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "All bookings", data: bookings, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.getUpcomingBookings = async (req, res) => {
  try {
    const dateNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

    const bookings = await Booking.find({ date_time: { $gte: dateNow } })
      .populate("user", "name -_id")
      .select("date_time status")
      .sort({ date_time: 1 });
    return res
      .status(200)
      .json({ message: "Upcoming bookings", data: bookings, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};
