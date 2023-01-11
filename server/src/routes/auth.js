const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  register,
  login,
  logout,
  resetPassword,
  deleteUser,
  updateUser,
  allUsers,
  getUserData,
} = require("../controller/auth");

// MIDDLEWARE
const {
  authentication,
  authorizeRoles,
} = require("../middleware/authentication");

// ROUTES
router.route("/login").post(login);
router.route("/logout").get(logout);

// AUTHENTICATED
router.route("/user-data").get(authentication, getUserData);
// AUTHENTICATED

// ADMIN
router
  .route("/register")
  .post(authentication, authorizeRoles("Admin"), register);
// ADMIN

// ICT
router
  .route("/users")
  .get(authentication, authorizeRoles("Admin", "ICT"), allUsers);
router
  .route("/user/:id")
  .put(authentication, authorizeRoles("ICT"), updateUser)
  .delete(authentication, authorizeRoles("Admin", "ICT"), deleteUser);
// ICT

module.exports = router;
