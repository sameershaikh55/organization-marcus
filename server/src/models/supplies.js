const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const suppliesSchema = new Schema({
  tagID: {
    type: String,
    required: [true, "Please Enter the Tag ID"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter the Description"],
    trim: true,
  },
  serialNumber: {
    type: String,
    required: [true, "Please Enter the Serial Number"],
    trim: true,
    unique: true,
  },
  quantity: {
    type: String,
    required: [true, "Please Enter the Quantity"],
    trim: true,
  },
  prixUnit: {
    type: String,
    required: [true, "Please Enter the Prix Unit"],
    trim: true,
  },
  purchaseDate: {
    type: String,
    required: [true, "Please Enter the Purchase Date"],
    trim: true,
  },
  depreciatedValue: {
    type: String,
    required: [true, "Please Enter the Depreciated Value"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SuppliesModel = new model("supplies", suppliesSchema);
module.exports = SuppliesModel;
