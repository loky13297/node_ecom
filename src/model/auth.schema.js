const mongoose = require("mongoose");

const authUser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: false,
    trim: false,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  },
  isDelete: {
    type: Boolean,
    required: false,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model("users", authUser);
