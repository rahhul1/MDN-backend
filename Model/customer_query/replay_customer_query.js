const mongoose = require("mongoose");

const replaycustomerSchema = new mongoose.Schema({
  customerId: String,
  replay: String,
  email: String,
  createdAt: Date,
  expiresAt: Date,
});

// create db collection
module.exports = mongoose.model("replaycustomer", replaycustomerSchema);
