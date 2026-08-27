const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {_id: false},
);

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    addressLine1: {
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

    pincode: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
  },
  {_id: false},
);

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      required: true,
    },

    serviceCharge: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    address: {
      type: addressSchema,
      required: true,
    },

    razorpayOrderId: {
      type: String,
      default: '',
    },

    razorpayPaymentId: {
      type: String,
      default: '',
    },

    paymentMethod: {
      type: String,
      default: 'Razorpay',
    },

    status: {
      type: String,
      default: 'Preparing',
    },

    paymentStatus: {
      type: String,
      default: 'Paid',
    },

    placedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', orderSchema);