const ErrorHandler = require("../utils/errorhandler");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");

const usersDetailSchema = new Schema({
  personalInformation: {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Ms"],
      default: "Mr",
    },
    firstName: {
      type: String,
      required: [true, "Please Enter the First Name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please Enter the Last Name"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please Enter the Personal Information Date Of Birth"],
    },
    placeOfBirth: {
      type: String,
      required: [true, "Please Enter the Place Of Birth"],
      trim: true,
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    status: {
      type: String,
      enum: ["Single", "Married", "Window (er)", "Divorced"],
      default: "Single",
    },
    email: {
      type: String,
      required: [true, "Please Enter the Personal Email"],
      trim: true,
      validate: [validator.isEmail, "Please Enter a valid Personal Email"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "Please Enter the Phone"],
      trim: true,
      unique: true,
    },
  },
  spouse: {
    dateOfBirth: {
      type: Date,
      required: [true, "Please Enter the Spouse Date Of Birth"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the Spouse Email"],
      trim: true,
      validate: [validator.isEmail, "Please Enter a valid Spouse Email"],
    },
    name: {
      type: String,
      required: [true, "Please Enter the Spouse Name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please Enter the Spouse Phone"],
      trim: true,
    },
  },
  emergencyContact: {
    dateOfBirth: {
      type: Date,
      required: [true, "Please Enter the Emergency Contact Date Of Birth"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the Emergency Contact Email"],
      trim: true,
      validate: [
        validator.isEmail,
        "Please Enter a valid Emergency Contact Email",
      ],
    },
    name: {
      type: String,
      required: [true, "Please Enter the Emergency Contact Name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please Enter the Emergency Contact Phone"],
      trim: true,
    },
  },
  education: {
    dateOfGraduation: {
      type: Date,
      required: [true, "Please Enter the Date of Graduation"],
    },
    title: {
      type: String,
      required: [true, "Please Enter the Education Title"],
      trim: true,
    },
    university: {
      type: String,
      required: [true, "Please Enter the University"],
      trim: true,
    },
  },
  position: {
    contractEndDate: {
      type: Date,
      required: [true, "Please Enter the Contract End Date"],
    },
    contractEntryDate: {
      type: Date,
      required: [true, "Please Enter the Contract Entry Date"],
    },
    role: {
      type: String,
      enum: ["Employee", "Logistic", "Executive", "Admin", "ICT"],
      default: "Employee",
    },
  },
  beneficiary: [
    {
      dateOfBirth: {
        type: Date,
        required: [true, "Please Enter the Beneficiary Date Of Birth"],
      },
      email: {
        type: String,
        required: [true, "Please Enter the Beneficiary Email"],
        trim: true,
        validate: [validator.isEmail, "Please Enter a valid Beneficiary Email"],
      },
      firstName: {
        type: String,
        required: [true, "Please Enter the Beneficiary First Name"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Please Enter the Beneficiary Last Name"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Please Enter the Beneficiary Phone"],
        trim: true,
      },
    },
  ],
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

usersDetailSchema.pre("save", function (next) {
  if (this.beneficiary.length < 1) {
    return next(new ErrorHandler("Add atleast one Beneficiary", 422));
  } else {
    next();
  }
});

const UserDetails = new model("userDetails", usersDetailSchema);
module.exports = UserDetails;
