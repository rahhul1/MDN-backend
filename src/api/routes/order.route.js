const router = require("express").Router();
const {
  isRequestValidated,
  isOrderDetails,
} = require("../../validator/validator");
const {
  createOrder,
  updateOrder
} = require("../controllers/order.controller");

router.post("/create", isRequestValidated, isOrderDetails, createOrder);
router.put("/update", isRequestValidated, updateOrder);

module.exports = router;
