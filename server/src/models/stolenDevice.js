const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const stolenDeviceSchema = new Schema({
  type: {
    type: String,
    enum: ["lost", "stolen"],
    default: "lost",
  },
  stolenDate: {
    type: Date,
    default: Date.now,
  },
  serial: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Serial/IMEI number"],
    unique: true,
  },
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
  country: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Country"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your City"],
  },
  province: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Province"],
  },
  details: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Details and condition"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StolenDeviceModel = new model("stolenDevice", stolenDeviceSchema);
module.exports = StolenDeviceModel;
