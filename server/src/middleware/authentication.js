const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const RegistrationModel = require("../models/registration");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.authentication = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 403));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  res.user = await RegistrationModel.findById(decoded.id);

  next();
});

// AUTHORIZE ROLES
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(res.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${res.user.role} is not allowed to access this resouce`,
          403
        )
      );
    }

    next();
  };
};
