const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RegistrationModel = require("../models/registration");
const sendToken = require("../utils/jwtToken");
const sendResponse = require("../utils/sendResponse");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const userData = await RegistrationModel.create(req.body);
  userData.password = undefined;
  sendResponse(true, 201, "user", userData, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role)
    return next(new ErrorHandler("Invalid field", 422));

  const gettingRecord = await RegistrationModel.findOne({ email }).select(
    "+password"
  );

  if (!gettingRecord || gettingRecord?.status === "notActive")
    return next(new ErrorHandler("user not found", 404));

  const validPassword = await bcrypt.compare(password, gettingRecord.password);

  if (!validPassword || gettingRecord.role !== role)
    return next(new ErrorHandler("Invalid email, password and role", 400));

  gettingRecord.password = undefined;
  sendToken(gettingRecord, 200, res);
});

// LOGOUT
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  sendResponse(true, 200, "message", "logged out successfully", res);
});

// DELETE USER
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await RegistrationModel.findByIdAndDelete(id);
  sendResponse(true, 200, "user", deletedUser, res);
});

// Update Role
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  var updated;

  if ("password" in req.body) {
    const user = await RegistrationModel.findById(id);
    user.password = req.body.password;
    updated = await user.save({
      new: true,
      runValidators: true,
    });
    updated.password = undefined;
  } else {
    updated = await RegistrationModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  sendResponse(true, 200, "user", updated, res);
});

// Get all users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await RegistrationModel.find();

  const removingIrrelevent = users.filter((content) =>
    ["Employee", "Logistic", "Executive"].includes(content.role)
  );

  sendResponse(true, 200, "users", removingIrrelevent, res);
});

// GET USER DATA WITH TOKEN AUTHENTICATION
exports.getUserData = catchAsyncErrors(async (req, res, next) => {
  sendResponse(true, 200, "user", res.user, res);
});
