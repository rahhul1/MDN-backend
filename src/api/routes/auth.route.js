const router = require("express").Router();
const {
  logIn,
  register,
  verifyOTP,
  resendOTP,
  changePassword,
  forgotPassword
} = require("../controllers/auth.controller");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateLogInRequest,
} = require("../../validator/validator");

router.post("/login", validateLogInRequest, isRequestValidated, logIn);
router.post("/register", validateSignUpRequest, isRequestValidated, register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.put("/change-password", isRequestValidated, changePassword);
router.put("/forgot-password", isRequestValidated, forgotPassword);

module.exports = router;
