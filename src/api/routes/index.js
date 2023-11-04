const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const inquiryRoute = require("./inquiry.route");
// const productRoute = require("./product.route");
const orderRoute = require("./order.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/inquiry", inquiryRoute);
// router.use("/product", productRoute);
router.use("/order", orderRoute);

module.exports = router;
