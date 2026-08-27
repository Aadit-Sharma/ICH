const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    addressId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Number,
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      default: '',
      trim: true,
    },

    deliveryInstructions: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'Address',
  addressSchema,
);