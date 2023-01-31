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

// ROUTES
router.route("/").get(allSuppliesRequest);
router.route("/me").get(userAllSuppliesRequest);
router.route("/add").post(addSuppliesRequest);
router.route("/approve/:id").put(approveSuppliesRequest);
router.route("/:id").delete(deleteSuppliesRequest);

module.exports = router;
