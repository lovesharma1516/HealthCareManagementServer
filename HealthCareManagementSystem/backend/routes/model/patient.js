const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
    medicalHistory: {
      type: String,
    },
    medications: {
      type: [String],
    },
    allergies: {
      type: [String],
    },
    surgeries: {
      type: [String],
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('Patient', patientSchema);