const router = require('express').Router();
const { signUp, logIn, verifyToken,updateuser ,changepassword,getUser_all, user_delete, verifyOTP, resendOTP } = require("../../controllers/user_controllers/varifyControllers");
const {
    isRequestValidated,
    validateSignUpRequest,
    validateLogInRequest,
} = require("../../validator/validator");

// const sendMail = require('../controllers/sendMail')

router.get("/userdeatils", getUser_all)
// router.get("/sendmail", sendMail)

router.delete("/:id", user_delete)

router.post("/signup", validateSignUpRequest, isRequestValidated, signUp);

router.post("/login", validateLogInRequest, isRequestValidated, logIn);
router.post("/verifyOTP", verifyOTP);
router.post("/resendOTP", resendOTP);
router.put("/change-password/:id",isRequestValidated,changepassword)
router.put("/update-user/:id",isRequestValidated,updateuser)




module.exports = router;
