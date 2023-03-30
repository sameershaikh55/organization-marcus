const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  addSupplies,
  allSupplies,
  deleteSupplies,
  editSupplies,
} = require("../controller/supplies");

// MIDDLEWARE
const {
  authentication,
  authorizeRoles,
} = require("../middleware/authentication");

// ROUTES
router.route("/").get(authentication, allSupplies);
router
  .route("/add")
  .post(authentication, authorizeRoles("Logistic"), addSupplies);
router
  .route("/:id")
  .put(authentication, authorizeRoles("Logistic"), editSupplies)
  .delete(authentication, authorizeRoles("Logistic"), deleteSupplies);

module.exports = router;
