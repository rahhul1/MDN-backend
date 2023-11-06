const router = require("express").Router();
const {
  allUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  isRequestValidated,
} = require("../../validator/validator");

router.get("/", allUsers);
router.put("/update/:id", isRequestValidated, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
