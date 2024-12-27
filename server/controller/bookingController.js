const Booking = require("../models/Booking");

exports.createBooking = async(req, res) => {
    try {
        const { date_time } = req.body;
        const userId = req.user.id;
        const newBooking = new Booking({ userId, date_time });
        await newBooking.save();
        return res.status(200).json({ message: "Booking created successfully", data: newBooking, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ userId }).select( "date_time status");
        return res.status(200).json({ message: "User's bookings", data: bookings, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = "Cancelled";
        await booking.save();
        return res.status(200).json({ message: "Booking cancelled successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}