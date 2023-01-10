const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  addSupplies,
  allSupplies,
  deleteSupplies,
} = require("../controller/supplies");

// MIDDLEWARE
const {
  authentication,
  authorizeRoles,
} = require("../middleware/authentication");

// ROUTES
router
  .route("/")
  .get(authentication, authorizeRoles("Employee", "Logistic"), allSupplies);
router
  .route("/add")
  .post(authentication, authorizeRoles("Logistic"), addSupplies);
router
  .route("/:id")
  .delete(authentication, authorizeRoles("Logistic"), deleteSupplies);

module.exports = router;
