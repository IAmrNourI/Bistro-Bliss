const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    profile_pic:{
        type: String,
        default: ""
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    otp: { type: String },
    otpExpires: { type: Date },
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User