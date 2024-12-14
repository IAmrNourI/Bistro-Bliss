const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
    },
    category:{
        type: String,
        required: [true, "Category is required"],
    },
    description:{
        type: String,
        required: [true, "Description is required"],
    },
    image:{
        type: String,
        default: ""
    }

},{timestamps: true});

const MenuItem = mongoose.model('menu_Item', menuItemSchema);
module.exports = MenuItem