const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RequestedSuppliesModel = require("../models/requestedSupplies");
const SuppliesModel = require("../models/supplies");
const sendResponse = require("../utils/sendResponse");
const ErrorHandler = require("../utils/errorhandler");

// Get all Supplies
exports.allSuppliesRequest = catchAsyncErrors(async (req, res, next) => {
  const requests = await RequestedSuppliesModel.find()
    .populate("user")
    .populate("supplies");
  sendResponse(true, 200, "supplies", requests, res);
});

// Get all Supplies
exports.userAllSuppliesRequest = catchAsyncErrors(async (req, res, next) => {
  const requests = await RequestedSuppliesModel.find({
    user: res.user._id,
  })
    .populate("user")
    .populate("supplies");

  console.log(requests);

  sendResponse(true, 200, "supplies", requests, res);
});

// Add SuppliesRequest
exports.addSuppliesRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await RequestedSuppliesModel.create({
    ...req.body,
    user: res.user._id,
  });
  const requestedSupplies = await RequestedSuppliesModel.findById(request._id)
    .populate("user")
    .populate("supplies");

  sendResponse(true, 201, "supplies", requestedSupplies, res);
});

// DELETE SuppliesRequest
exports.deleteSuppliesRequest = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const request = await RequestedSuppliesModel.findByIdAndDelete(id);
  sendResponse(true, 200, "supplies", request, res);
});

// APPROCE SuppliesRequest
exports.approveSuppliesRequest = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const request = await RequestedSuppliesModel.findById(id);
  const requestedSupplies = await SuppliesModel.findById(request.supplies);

  if (request.requestedQuantity > requestedSupplies.quantity) {
    return next(
      new ErrorHandler(
        `${request.requestedQuantity} Quantity is not available`,
        422
      )
    );
  }

  const updatedSupplies = await SuppliesModel.findByIdAndUpdate(
    request.supplies,
    {
      $inc: { quantity: -request.requestedQuantity },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const requestUpdated = await RequestedSuppliesModel.findByIdAndDelete(id);

  sendResponse(
    true,
    200,
    "supplies",
    { supplies: updatedSupplies, requests: requestUpdated },
    res
  );
});
