const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// CONTROLLERS
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");

// ROUTES
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/password/forgot")
  .post(
    body("email").isEmail().withMessage("Please enter a valid email address"),
    forgotPassword
  );
router.route("/password/reset/:token").patch(resetPassword);

module.exports = router;
