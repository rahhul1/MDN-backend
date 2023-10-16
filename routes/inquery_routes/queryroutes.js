const router = require("express").Router();
const {
  verifyToken,
} = require("../../controllers/user_controllers/varifyControllers");

const {
  isRequestValidated,
  isvalidatecustmoerquery,
} = require("../../validator/validator");
const {
  custmoerquerys,
  getquery_all,
  replaycustomers,
} = require("../../controllers/inquery_controllers/customer_query");

router.post(
  "/create-inquery",
  isvalidatecustmoerquery,
  isRequestValidated,
  custmoerquerys
);
router.get("/deatils", getquery_all);
router.post("/replay-query", replaycustomers);

module.exports = router;
