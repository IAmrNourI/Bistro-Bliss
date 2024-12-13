const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
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
    }

},{timestamps: true});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu