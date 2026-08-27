const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/*
 * REGISTER
 */
router.post('/register', async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      gender,
      age,
      birthDate,
      phone,
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    const cleanUsername = username.trim();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    const existingUser = await User.findOne({
      username: cleanUsername,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists.',
      });
    }

    const lastUser = await User.findOne()
      .sort({userId: -1})
      .select('userId');

    const nextUserId =
      lastUser ? lastUser.userId + 1 : 1;

    const passwordHash =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      userId: nextUserId,
      username: cleanUsername,
      passwordHash,

      firstName: firstName
        ? firstName.trim()
        : '',

      lastName: lastName
        ? lastName.trim()
        : '',

      email: email
        ? email.trim()
        : '',

      gender: gender
        ? gender.trim()
        : '',

      age: age !== undefined && age !== null
        ? String(age).trim()
        : '',

      birthDate: birthDate
        ? birthDate.trim()
        : '',

      phone: phone
        ? phone.trim()
        : '',
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
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
    console.error(
      'Registration failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to register user.',
    });
  }
});

/*
 * LOGIN
 */
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    const user = await User.findOne({
      username: username.trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.passwordHash,
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }

    const accessToken =
      jwt.sign(
        {
          userId: user.userId,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

    return res.json({
      success: true,
      message: 'Login successful.',
      data: {
        accessToken,
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
    console.error(
      'Login failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to login.',
    });
  }
});

module.exports = router;