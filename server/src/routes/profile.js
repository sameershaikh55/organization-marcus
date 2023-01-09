const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { authentication } = require("../middleware/authentication");

// CONTROLLERS
const { updateProfile, getUserData } = require("../controller/profile");

// ROUTES
router.route("/update").patch(authentication, updateProfile);
router.route("/user-data").get(authentication, getUserData);

module.exports = router;
