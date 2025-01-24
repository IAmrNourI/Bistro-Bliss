const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
  status: {
    type: String,
    enum: ["Accepted", "Rejected"],
  },
  unSeen: {
    type: Boolean,
    default: true,
    required: true,
  }
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

