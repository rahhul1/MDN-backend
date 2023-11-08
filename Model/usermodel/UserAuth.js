const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    contactNumber: {
      type: String,
      require: true,
      min: 10,
    },
    token: {
      type: String,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    },
    verified: Boolean,
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.methods.hashPassword = function (password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};
// create db collection
module.exports = mongoose.model("varifydb1", userSchema);
