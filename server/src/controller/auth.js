const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RegistrationModel = require("../models/registration");
const UserDetails = require("../models/userDetails");
const sendToken = require("../utils/jwtToken");
const sendResponse = require("../utils/sendResponse");
const ObjectId = require("mongodb").ObjectId;

exports.register = catchAsyncErrors(async (req, res, next) => {
  const _id = new ObjectId();

  const userDataFields = {
    email: req.body.personalInformation.email,
    password: req.body.personalInformation.password,
    role: req.body.position.role,
  };

  req.body.personalInformation.password = undefined;
  const userDataDetail = await UserDetails.create({
    _id,
    ...req.body,
  });
  await RegistrationModel.create({
    _id,
    ...userDataFields,
  });
  sendResponse(true, 201, "user", userDataDetail, res);
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
  await UserDetails.findByIdAndDelete(id);
  const deletedUser = await RegistrationModel.findByIdAndDelete(id);
  sendResponse(true, 200, "user", deletedUser, res);
});

// Update Role
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  var updated;

  const { id } = req.params;
  updated = await UserDetails.findById(id);
  if ("password" in req.body) {
    const user = await RegistrationModel.findById(id);
    user.password = req.body.password;
    await user.save({
      new: true,
      runValidators: true,
    });
  } else if ("role" in req.body || "status" in req.body) {
    await RegistrationModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if ("role" in req.body) {
      const updatedVal = await UserDetails.findById(id);
      const position = {
        contractEndDate: updatedVal.position.contractEndDate,
        contractEntryDate: updatedVal.position.contractEntryDate,
        role: req.body.role,
      };
      updated = await UserDetails.findByIdAndUpdate(
        id,
        {
          position,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      updated = await UserDetails.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
    }
  }
  // else {
  //   updated = await UserDetails.findByIdAndUpdate(id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  // }

  sendResponse(true, 200, "user", updated, res);
});

// Update User Data
exports.updateWholeUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  var updated = await UserDetails.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  await RegistrationModel.findByIdAndUpdate(
    id,
    {
      email: updated.personalInformation.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  sendResponse(true, 200, "user", updated, res);
});

// Get all users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await UserDetails.find();

  const removingIrrelevent = users.filter((content) =>
    ["Employee", "Logistic", "Executive"].includes(content.position.role)
  );

  sendResponse(true, 200, "users", removingIrrelevent, res);
});

// GET USER DATA WITH TOKEN AUTHENTICATION
exports.getUserData = catchAsyncErrors(async (req, res, next) => {
  sendResponse(true, 200, "user", res.user, res);
});
