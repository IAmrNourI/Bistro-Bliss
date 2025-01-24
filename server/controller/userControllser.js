const User = require("../models/User");
const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { generateUniqueOtp, otpMessage } = require("../utils/otpGenerator");
const transporter = require("../config/nodemailer");
// const { trusted } = require("mongoose");
const { generateToken, generateForgetPasswordToken } = require("../utils/tokenGenerator");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, profilePic, role } = req.body;

    const hashedPassword = await bcryptjs.hashSync(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
      role,
    });
    await user.save();

    const otp = generateUniqueOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const mailOptions = otpMessage(otp, email);

    const result = await transporter.sendMail(mailOptions);
    if (result.messageId) {
      return res
        .status(200)
        .json({ message: "OTP sent successfully", email, success: true });
    }
    return res.status(400).json({ message: "Failed to send OTP" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email: email, otp });
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(404).json({ message: "OTP expired" });
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const otp = generateUniqueOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = otpMessage(otp, email);

    const result = await transporter.sendMail(mailOptions);
    if (result.messageId) {
      return res
        .status(200)
        .json({ message: "OTP sent successfully", success: true });
    }
    return res.status(400).json({ message: "Failed to send OTP" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found", error: true });
    }
    if (user.otp) {
      return res
        .status(401)
        .json({ message: "Pleaser verify your account first" });
    }
    return res.status(200).json({
      message: "User found",
      success: true,
      userId: user._id,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, error: true });
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findById(userId);

    const checkPassword = await bcryptjs.compareSync(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", error: true });
    }

    const tokenDetails = generateToken(user);

    // console.log("Set-Cookie Header:", tokenDetails.cookieOptions);

    return res
      .cookie("token", tokenDetails.token, tokenDetails.cookieOptions)
      .status(200)
      .json({
        message: "Login Successfully",
        success: true,
        token: tokenDetails.token,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res
      .status(200)
      .json({ message: "user found successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.logout = async (req, res) => {
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res
      .cookie("token", "", cookieOptions)
      .status(200)
      .json({ message: "Logged out", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, phoneNumber, profilePic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phoneNumber, profilePic },
      { new: true }
    );
    return res.status(200).json({
      message: "user updated successfully",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const users = await User.find({
      $or: [{ name: query, email: query }],
    }).select("-password");

    return res.status(200).json({
      message: "all users",
      data: users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      message: "all users",
      data: users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

exports.appointAsAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }
    if (user.role === "admin") {
      return res
        .status(400)
        .json({ message: "User is already an admin", error: true });
    }
    const admin = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    );

    return res
      .status(200)
      .json({
        message: "User Updated successfully",
        success: true,
        data: admin,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }
    const otp = generateUniqueOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = otpMessage(otp, email);
    const result = await transporter.sendMail(mailOptions);
    if (result.messageId) {
      return res
        .status(200)
        .json({ message: "Reset Password OTP sent successfully", success: true });
    }
    
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
};

exports.verifyResetPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email: email, otp });
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(404).json({ message: "OTP expired" });
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const forgetTokenDetails = generateForgetPasswordToken(user);
    console.log("Cookie: " , forgetTokenDetails.cookieOptions);
    return res
      .cookie("token", forgetTokenDetails.token, forgetTokenDetails.cookieOptions)
      .status(200)
      .json({
        message: "You can change your password now",
        success: true,
        token: forgetTokenDetails.token,
      })
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
}

exports.resetPassword = async (req, res) => {
  try {
    console.log("resetPassword")
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    console.log(req.user.id)
    const hashedPassword = await bcryptjs.hashSync(password, 12);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully", success: true });
  }catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
}
