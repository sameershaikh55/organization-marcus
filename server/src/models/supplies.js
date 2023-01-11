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
    type: Number,
    required: [true, "Please Enter the Quantity"],
    trim: true,
    min: [0, "Please Enter Quantity Minimum 0 or 1"],
  },
  prixUnit: {
    type: Number,
    required: [true, "Please Enter the Prix Unit"],
    trim: true,
    min: [0, "Please Enter Prix Unit Minimum 0 or 1"],
  },
  purchaseDate: {
    type: String,
    required: [true, "Please Enter the Purchase Date"],
    trim: true,
  },
  depreciatedValue: {
    type: Number,
    required: [true, "Please Enter the Depreciated Value"],
    trim: true,
    min: [0, "Please Enter Depreciated Value Minimum 0 or 1"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const SuppliesModel = new model("supplies", suppliesSchema);
module.exports = SuppliesModel;
