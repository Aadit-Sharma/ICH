const express = require('express');
const User = require('../models/User');

const router = express.Router();

/*
 * GET USER PROFILE
 */
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({
      userId: Number(req.params.userId),
    }).select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.json({
      success: true,
      data: {
        id: user.userId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        age: user.age,
        birthDate: user.birthDate,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Fetching user failed:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch user profile.',
    });
  }
});

/*
 * UPDATE USER PROFILE
 */
router.put('/:userId', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      age,
      birthDate,
      phone,
    } = req.body;

    const user = await User.findOne({
      userId: Number(req.params.userId),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (firstName !== undefined) {
      user.firstName = firstName.trim();
    }

    if (lastName !== undefined) {
      user.lastName = lastName.trim();
    }

    if (email !== undefined) {
      user.email = email.trim();
    }

    if (gender !== undefined) {
      user.gender = gender.trim();
    }

    if (age !== undefined) {
      user.age = String(age).trim();
    }

    if (birthDate !== undefined) {
      user.birthDate = birthDate.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    await user.save();

    return res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        id: user.userId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        age: user.age,
        birthDate: user.birthDate,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Updating user failed:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update user profile.',
    });
  }
});

module.exports = router;