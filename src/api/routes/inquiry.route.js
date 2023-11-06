const router = require("express").Router();
const {
  isRequestValidated,
  isValidateCustomerQuery,
} = require("../../validator/validator");
const {
  allInquiries,
  createInquiry,
  inquiryReplay,
} = require("../controllers/inquiry.controller");

router.get("/", allInquiries);
router.post(
  "/create",
  isValidateCustomerQuery,
  isRequestValidated,
  createInquiry
);
router.post("/replay", inquiryReplay);

module.exports = router;
