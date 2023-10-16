const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images:{  type: [String],
  required: true,
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
