const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RegistrationModel = require("../models/registration");
const sendToken = require("../utils/jwtToken");
const sendResponse = require("../utils/sendResponse");
const sendEmail = require("../utils/sendEmail");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const userData = await RegistrationModel.create(req.body);
  userData.password = undefined;
  sendToken(userData, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorHandler("Invalid field", 422));

  const gettingRecord = await RegistrationModel.findOne({ email }).select(
    "+password"
  );

  if (!gettingRecord) return next(new ErrorHandler("user not found", 404));

  const validPassword = await bcrypt.compare(password, gettingRecord.password);

  if (!validPassword)
    return next(new ErrorHandler("Invalid email and password", 400));

  gettingRecord.password = undefined;
  sendToken(gettingRecord, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  sendResponse(true, 200, "message", "logged out successfully", res);
});

// Forget Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await RegistrationModel.findOne({ email }).select(
    "+resetPasswordToken"
  );

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.PASSWORD_RESET_URL}/password/reset/${resetToken}`;

  const message = `Your password reset URL is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });

    sendResponse(
      true,
      200,
      "message",
      `Email sent to ${user.email} successfully`,
      res
    );
  } catch (error) {
    user.resetPasswordToken.token = undefined;
    user.resetPasswordToken.expire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password) {
    return next(new ErrorHandler("Invalid field", 422));
  }

  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await RegistrationModel.findOne({
    "resetPasswordToken.token": resetPasswordToken,
    "resetPasswordToken.expire": { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password URL is invalid or has been expired", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = password;
  user.resetPasswordToken.token = undefined;
  user.resetPasswordToken.expire = undefined;

  await user.save();

  sendResponse(true, 200, "message", "Password Reset Successfully!", res);
});
