const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({

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
        }
      },
    ],

}, { timestamps: true });

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;