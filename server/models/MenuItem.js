const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      enum: ["Breakfast", "Main Dishes", "Drinks", "Desserts"],
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("Menu_Item", MenuItemSchema);
module.exports = MenuItem;
