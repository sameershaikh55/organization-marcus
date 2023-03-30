const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const validator = require("validator");
var jwt = require("jsonwebtoken");

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["Employee", "Logistic", "Executive", "Admin", "ICT"],
    default: "Employee",
  },
  status: {
    type: String,
    enum: ["Active", "notActive"],
    default: "notActive",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

// JWT TOKEN
usersSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const RegistrationModel = new model("users", usersSchema);
module.exports = RegistrationModel;
