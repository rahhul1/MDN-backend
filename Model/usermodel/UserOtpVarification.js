const mongoose = require("mongoose");

const UserOtpVarificationSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

// create db collection
module.exports = mongoose.model("varifyOtp1", UserOtpVarificationSchema);
