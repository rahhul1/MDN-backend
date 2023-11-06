const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { 
    type: String,
  },
  product_id:{
    type: String,
  },
  orderNo: {
    type: String,
    unique: true,
    default: () =>
      Math.floor(1000000000 + Math.random() * 9000000000).toString(),
  },
  order_status:{
    type: String,
    require: true,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  houseNo: {
    type: String,
    require: true,
  },
  streetName: {
    type: String,
    require: true,
  },
  nearlocation: {
    type: String,
    require: true,
  },
  pincode: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  netQuantity: {
    type: String,
    require: true,
    min: 1,
    max: 5,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  productDetails:{
    type:Object
  },
  userDetails:{
    type:Object
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
