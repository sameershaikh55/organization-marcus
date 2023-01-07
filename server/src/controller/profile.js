const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RegistrationModel = require("../models/registration");
const sendResponse = require("../utils/sendResponse");

// UPDATE PROFILE
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const updated = await RegistrationModel.findByIdAndUpdate(
    res.user._id,
    req.body,
    {
      new: true,
    }
  );

  sendResponse(true, 200, "user", updated, res);
});

// GET USER DATA WITH TOKEN AUTHENTICATION
exports.getUserData = catchAsyncErrors(async (req, res, next) => {
  sendResponse(true, 200, "user", res.user, res);
});
