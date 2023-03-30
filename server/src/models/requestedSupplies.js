const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestedSupplies = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  supplies: {
    type: mongoose.Types.ObjectId,
    ref: "supplies",
  },
  requestedQuantity: {
    type: Number,
    required: [true, "Please Enter Quantity"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RequestedSuppliesModel = new model(
  "requestedSupplies",
  requestedSupplies
);
module.exports = RequestedSuppliesModel;
