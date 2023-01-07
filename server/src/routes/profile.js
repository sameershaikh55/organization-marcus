const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { authentication } = require("../middleware/authentication");

// CONTROLLERS
const {
  updateProfile,
  getUserData,
  getUserDevices,
} = require("../controller/profile");

// ROUTES
router.route("/update").patch(authentication, updateProfile);
router.route("/user-data").get(authentication, getUserData);
router.route("/user-devices").get(authentication, getUserDevices);

module.exports = router;
