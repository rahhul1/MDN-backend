const router = require("express").Router();
const {
  isRequestValidated,
  isproductcreate,
  isproductioninformation,
  isadditionalinformation,
} = require("../validator/validator");
const {
  createproducts,
  deatilsproduct,
  getbyidproduct,
  deletebyidproduct,
  updatedeatils,
  updatebyimage,
  deletebyimage,
} = require("../../controllers/products_controllers/products");
const {
  productsinformation,
  deletebyidInfoproduct,
  getbyidinfoproduct,
  deatilsinfoproduct,
  updateinformationproduct,
} = require("../../controllers/products_controllers/productinformation");
const {
  addtionalinformations,
  deatilsaddtionproduct,
  getbyidadtionproduct,
  deletebyidaddtionproduct,
  updateaddtionnproduct,
} = require("../../controllers/products_controllers/adtionalinformation");
const {
  allproductinformation,
} = require("../../controllers/products_controllers/allproduct_information");

const multer = require("multer");
const path = require("path");
// Set the storage engine for Multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

router.get("/", allProducts);
router.get("/information-details", deatilsinfoproduct);
router.get("/product-informationbyid/:id", getbyidinfoproduct);
router.get("/aditional-details", deatilsaddtionproduct);
router.get("/aditional-informationbyid/:id", getbyidadtionproduct);
router.get("/all-production-information/:id", allproductinformation);
router.get("/:id", getProduct);

router.post("/create-product", upload.array("images", 20), createproducts);
router.post(
  "/product-information",
  isproductioninformation,
  isRequestValidated,
  productsinformation
);
router.post(
  "/aditonal-information",
  isadditionalinformation,
  isRequestValidated,
  addtionalinformations
);

router.put("/update-deatils/:id", updatedeatils);
router.put(
  "/:product-id/images/:imageIndex",
  upload.single("imageUrls"),
  updatebyimage
);
router.put("/product-update-information/:id", updateinformationproduct);
router.put("/aditional-update-information/:id", updateaddtionnproduct);

router.delete("/delete-product-id/:id", deletebyidproduct);
router.delete(
  "/:product-id/images/:imageIndex",
  upload.single("images"),
  deletebyimage
);
router.delete("/product-information", deletebyidInfoproduct);
router.delete("/aditional-information", deletebyidaddtionproduct);

module.exports = router;
