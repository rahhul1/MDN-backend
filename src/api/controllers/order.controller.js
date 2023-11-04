const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const Order = require("../model/order.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      product_id,
      houseNo,
      streetName,
      nearlocation,
      pincode,
      state,
      city,
      country,
      netQuantity,
    } = req.body;
    if (
      !houseNo ||
      !streetName ||
      !nearlocation ||
      !pincode ||
      !state ||
      !city ||
      !country ||
      !netQuantity
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    }

    const productDetails = await Product.findById(product_id);
    const userDetails = await User.findById(user_id);
    console.log("userDetails", userDetails);
    if (!productDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found",
      });
    }

    if (!userDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User is not found",
      });
    }

    const orderdata = {
      user_id,
      product_id,
      order_status: "Pending",
      houseNo,
      streetName,
      nearlocation,
      pincode,
      state,
      city,
      country,
      netQuantity,
      productDetails: productDetails,
      userDetails: userDetails,
    };

    console.log("orderdata", orderdata);

    Order.create(orderdata).then((result, err) => {
      if (!err) {
        sendMail(result, res);
        res.status(StatusCodes.OK).json({
          message: "order sucessfully",
          user: orderdata,
        });
      } else {
        res.json({
          status: "Faild",
          message: err.message,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Faild",
      message: err.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const {
      user_id,
      product_id,
      houseNo,
      streetName,
      nearlocation,
      pincode,
      state,
      city,
      country,
      netQuantity,
    } = req.body;
    if (
      !houseNo ||
      !streetName ||
      !nearlocation ||
      !pincode ||
      !state ||
      !city ||
      !country ||
      !netQuantity
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    }

    const productDetails = await Product.findById(product_id);
    const userDetails = await User.findById(user_id);
    console.log("userDetails", userDetails);
    if (!productDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found",
      });
    }

    if (!userDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User is not found",
      });
    }

    const orderdata = {
      user_id,
      product_id,
      order_status: "Pending",
      houseNo,
      streetName,
      nearlocation,
      pincode,
      state,
      city,
      country,
      netQuantity,
      productDetails: productDetails,
      userDetails: userDetails,
    };

    console.log("orderdata", orderdata);

    Order.create(orderdata).then((result, err) => {
      if (!err) {
        sendMail(result, res);
        res.status(StatusCodes.OK).json({
          message: "order sucessfully",
          user: orderdata,
        });
      } else {
        res.json({
          status: "Faild",
          message: err.message,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Faild",
      message: err.message,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder
};
