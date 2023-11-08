const router = require("express").Router();

const {
  isRequestValidated,
  isorderdeatils
} = require("../../validator/validator");


const {
    ordercreate
  } = require("../../controllers/order_controllers/order_controllers");

router.post("/Create-order",isRequestValidated ,isorderdeatils,ordercreate);
router.put("/update-order",isRequestValidated ,ordercreate);


module.exports = router;
