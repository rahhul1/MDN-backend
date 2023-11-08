const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Product = require("../Model/products/product_information")

const validateSignUpRequest = [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("email").notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Valid Email required"),
    check("password").notEmpty().withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 character long"),
    check("contactNumber").notEmpty().withMessage("Phone number is required")
        .isLength({min:10})
        .withMessage("Phone is must be 10 digit")
];



const validateLogInRequest = [
    check("email").isEmail().withMessage("Valid Email required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Please Enter Valid Password"),
]
const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: errors.array()[0].msg });
    }
    next();
};

const isvalidatecustmoerquery = [
    check("fullName").notEmpty().withMessage("First Name is required"),
    check("email").notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Valid Email required"),
    check("contactNumber").notEmpty().withMessage("Phone number is required")
        .isLength({min:10})
        .withMessage("Phone is must be 10 digit"),
    check("comment").notEmpty().withMessage("Information is required")
          
];

const isproductcreate = [
    check("name").notEmpty().withMessage(" Name is required"),
    check("price").notEmpty().withMessage("Price is required")
        .isEmail().withMessage("Valid Email required"),
    check("images").notEmpty().withMessage("images  is required"),
          
];
const isproductioninformation =[
    check("brand").notEmpty().withMessage("brand is required"),
    check("manufacturer").notEmpty().withMessage(" manufacturer is required"),
    check("model").notEmpty().withMessage(" model is required"),
   
    check("model_name").notEmpty().withMessage(" model_name is required"),
    check("model_year").notEmpty().withMessage(" model_year is required"),
    check("Includes_Rechargeable_battery").notEmpty().withMessage(" Includes_Rechargeable_battery is required"),
    check("voltage").notEmpty().withMessage(" voltage is required"),
    check("wattage").notEmpty().withMessage(" wattage is required"),
    check("power_source").notEmpty().withMessage(" power_source is required"),
    check("country_of_origin").notEmpty().withMessage(" Country_of_origin is required"),
    check("item_weight").notEmpty().withMessage(" item_weight is required"),
]

const isadditionalinformation =[
    check("product_id").notEmpty().withMessage("product_id is required"),
    check("asin").notEmpty().withMessage("asin is required"),
    check("packer").notEmpty().withMessage("packer is required"),
    check("importer").notEmpty().withMessage("importer is required"),
    check("net_quantity").notEmpty().withMessage("net_quantity is required")
   ]
const isorderdeatils =[
    check("houseNo").notEmpty().withMessage("House No is required"),
    check("streetName").notEmpty().withMessage("Street Name No is required"),

    check("nearlocation").notEmpty().withMessage("Near Location No is required"),

    check("pincode").notEmpty().withMessage("Pincode is required"),

    check("state").notEmpty().withMessage("state is required"),
    check("city").notEmpty().withMessage("city is required"),
    check("country").notEmpty().withMessage("Country is required"),

    check("netQuantity").notEmpty().withMessage("netQuantity is required")
    .isLength({ min: 1 })
        .withMessage("netQuantity Must 1 character long")
        .isLength({ max: 6 })
        .withMessage("netQuantity Must 6 character long"),
]   
module.exports = {
    validateSignUpRequest,
    isRequestValidated,
    validateLogInRequest,
    isvalidatecustmoerquery,
    isproductcreate,
    isproductioninformation,
    isadditionalinformation,
    isorderdeatils
};
