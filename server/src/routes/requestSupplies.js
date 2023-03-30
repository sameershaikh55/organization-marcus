const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  addSuppliesRequest,
  deleteSuppliesRequest,
  allSuppliesRequest,
  approveSuppliesRequest,
  userAllSuppliesRequest,
} = require("../controller/requestSupplies");

// MIDDLEWARE
const { authentication } = require("../middleware/authentication");

// ROUTES
router.route("/").get(authentication, allSuppliesRequest);
router.route("/me").get(authentication, userAllSuppliesRequest);
router.route("/add").post(authentication, addSuppliesRequest);
router.route("/approve/:id").put(authentication, approveSuppliesRequest);
router.route("/:id").delete(authentication, deleteSuppliesRequest);

module.exports = router;
