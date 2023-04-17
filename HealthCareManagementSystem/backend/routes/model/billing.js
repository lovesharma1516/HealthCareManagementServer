const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    billingDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    insurance: {
      type: String,
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('Billing', billingSchema);
