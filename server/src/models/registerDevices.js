const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const registerDevicesSchema = new Schema({
  deviceType: {
    type: String,
    enum: [
      "Laptop",
      "Digital Camera",
      "Smartphone",
      "Console",
      "Tablet",
      "Other",
    ],
    default: "other",
  },
  serial: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Serial/IMEI number"],
    unique: true,
  },
  make: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Make"],
  },
  model: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Model"],
  },
  uniqueIdentifiers: {
    type: String,
    required: [true, "Please Enter List of unique identifiers"],
    trim: true,
  },
  deviceImage: {
    type: String,
    required: [true, "Please upload a device image"],
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  reported: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RegisterDevicesModel = new model(
  "registerDevices",
  registerDevicesSchema
);
module.exports = RegisterDevicesModel;
