const express = require('express');
const Address = require('../models/Address');

const router = express.Router();

/*
 * GET ALL ADDRESSES FOR USER
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const addresses = await Address.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      addresses: addresses.map(address => ({
        id: address.addressId,
        userId: address.userId,
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        landmark: address.landmark,
        deliveryInstructions:
          address.deliveryInstructions,
      })),
    });
  } catch (error) {
    console.error(
      'Fetching addresses failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch addresses.',
    });
  }
});

/*
 * CREATE ADDRESS
 */
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      fullName,
      phone,
      addressLine1,
      city,
      state,
      pincode,
      landmark,
      deliveryInstructions,
    } = req.body;

    if (
      userId == null ||
      !fullName ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required address details.',
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must contain 10 digits.',
      });
    }

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: 'Pincode must contain 6 digits.',
      });
    }

    const addressId =
      `ADDR-${Date.now()}-${Math.floor(
        Math.random() * 1000,
      )}`;

    const address = await Address.create({
      addressId,
      userId: Number(userId),
      fullName: fullName.trim(),
      phone: phone.trim(),
      addressLine1: addressLine1.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      landmark: landmark
        ? landmark.trim()
        : '',
      deliveryInstructions:
        deliveryInstructions
          ? deliveryInstructions.trim()
          : '',
    });

    return res.status(201).json({
      success: true,
      message: 'Address added successfully.',
      address: {
        id: address.addressId,
        userId: address.userId,
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        landmark: address.landmark,
        deliveryInstructions:
          address.deliveryInstructions,
      },
    });
  } catch (error) {
    console.error(
      'Creating address failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to create address.',
    });
  }
});

/*
 * DELETE ADDRESS
 */
router.delete('/:addressId', async (req, res) => {
  try {
    const address =
      await Address.findOneAndDelete({
        addressId: req.params.addressId,
      });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.',
      });
    }

    return res.json({
      success: true,
      message: 'Address deleted successfully.',
    });
  } catch (error) {
    console.error(
      'Deleting address failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to delete address.',
    });
  }
});

module.exports = router;