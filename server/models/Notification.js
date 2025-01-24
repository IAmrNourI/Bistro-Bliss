const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  date_time: {
    type: Date,
    required: [true, "date is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
  status: {
    type: String,
    enum: ["Accepted", "Rejected"],
  },
  seen: {
    type: Boolean,
    default: false,
    required: true,
  }
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

