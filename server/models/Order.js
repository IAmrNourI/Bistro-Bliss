const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuItems: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu_Item",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "preparing", "shipping", "delivered", "cancelled"],
      default: "Pending",
    },
    estimatedTime: {
      type: Date,
      default: Date.now(),
      required: true,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
