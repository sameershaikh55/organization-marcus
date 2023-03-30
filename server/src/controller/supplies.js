const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SuppliesModel = require("../models/supplies");
const sendResponse = require("../utils/sendResponse");

// Add Supplies
exports.addSupplies = catchAsyncErrors(async (req, res, next) => {
  const supplies = await SuppliesModel.create(req.body);
  sendResponse(true, 201, "supplies", supplies, res);
});

// Edit Supplies
exports.editSupplies = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const updated = await SuppliesModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  sendResponse(true, 200, "supplies", updated, res);
});

// Get all Supplies
exports.allSupplies = catchAsyncErrors(async (req, res, next) => {
  const supplies = await SuppliesModel.find();
  sendResponse(true, 200, "supplies", supplies, res);
});

// DELETE Supplies
exports.deleteSupplies = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const supplies = await SuppliesModel.findByIdAndDelete(id);
  sendResponse(true, 200, "supplies", supplies, res);
});
