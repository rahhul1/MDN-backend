const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },

    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      require: true,
      min: 10,
    },
    comment: {
      type: String,
      require: true,
    },
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer_query", querySchema);
