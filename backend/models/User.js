const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      default: '',
      trim: true,
    },

    lastName: {
      type: String,
      default: '',
      trim: true,
    },

    email: {
      type: String,
      default: '',
      trim: true,
    },

    gender: {
      type: String,
      default: '',
      trim: true,
    },

    age: {
      type: String,
      default: '',
    },

    birthDate: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);