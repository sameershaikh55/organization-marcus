const ErrorHandler = require("../utils/errorhandler");
const RegisterDevices = require("../models/registerDevices");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.deviceAuthentication = catchAsyncErrors(async (req, res, next) => {
  const gettingRecord = await RegisterDevices.findById(req.params.id);

  if (!gettingRecord) {
    return next(new ErrorHandler("Device not found", 404));
  }

  if (res.user._id.toString() !== gettingRecord.user.toString()) {
    return next(new ErrorHandler("Invalid Product ID", 400));
  }

  return next();
});
