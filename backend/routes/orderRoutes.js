const express = require('express');
const paymentRoutes = require('./paymentRoutes');
const Order = require('../models/Order');

const router = express.Router();

const paymentOrders =
  paymentRoutes.paymentOrders;

/*
 * Create an ICH order
 */
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      username,
      items,
      subtotal,
      tax,
      serviceCharge,
      total,
      address,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    /*
     * Validate common order details
     */
    if (
      userId == null ||
      !username ||
      !items ||
      !items.length ||
      !address ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details.',
      });
    }

    /*
     * RAZORPAY PAYMENT
     */
    if (paymentMethod === 'Razorpay') {
      /*
       * Razorpay details are required
       */
      if (
        !razorpayOrderId ||
        !razorpayPaymentId
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Razorpay payment details are required.',
        });
      }

      /*
       * Check that Razorpay payment was verified
       * by our backend before creating the order.
       */
      const verifiedPayment =
        paymentOrders.get(razorpayOrderId);

      if (
        !verifiedPayment ||
        verifiedPayment.status !== 'VERIFIED' ||
        verifiedPayment.paymentId !==
          razorpayPaymentId
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Payment has not been verified.',
        });
      }
    }

    /*
     * Only these payment methods are allowed
     */
    if (
      paymentMethod !== 'Razorpay' &&
      paymentMethod !== 'Cash on Delivery'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method.',
      });
    }

    /*
     * Generate the ICH order ID
     */
    const orderId = `ORD-${Date.now()}`;

    /*
     * Payment status depends on payment method
     *
     * Razorpay:
     * Payment already completed -> Paid
     *
     * Cash on Delivery:
     * Payment will happen at delivery/pickup -> Pending
     */
    const paymentStatus =
      paymentMethod === 'Cash on Delivery'
        ? 'Pending'
        : 'Paid';

    /*
     * Create order in MongoDB
     */
    const order = await Order.create({
      id: orderId,

      userId,
      username,

      items,

      subtotal,
      tax,
      serviceCharge,
      total,

      address,

      paymentMethod,

      razorpayOrderId:
        razorpayOrderId || '',

      razorpayPaymentId:
        razorpayPaymentId || '',

      status: 'Preparing',

      paymentStatus,

      placedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      order,
    });
  } catch (error) {
    console.error(
      'Order creation failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to create order.',
    });
  }
});

/*
 * Get all orders for a user
 */
router.get(
  '/user/:userId',
  async (req, res) => {
    try {
      const userId = Number(
        req.params.userId,
      );

      if (Number.isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID.',
        });
      }

      const userOrders =
        await Order.find({
          userId: userId,
        }).sort({
          placedAt: -1,
        });

      return res.json({
        success: true,
        orders: userOrders,
      });
    } catch (error) {
      console.error(
        'Fetching orders failed:',
        error,
      );

      return res.status(500).json({
        success: false,
        message: 'Unable to fetch orders.',
      });
    }
  },
);

/*
 * Update order status
 */
router.patch(
  '/:orderId/status',
  async (req, res) => {
    try {
      const {status} = req.body;

      const allowedStatuses = [
        'Preparing',
        'Ready for Pickup',
        'Delivered',
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order status.',
        });
      }

      const order = await Order.findOne({
        id: req.params.orderId,
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found.',
        });
      }

      order.status = status;

      await order.save();

      return res.json({
        success: true,
        message:
          'Order status updated successfully.',
        order,
      });
    } catch (error) {
      console.error(
        'Updating order status failed:',
        error,
      );

      return res.status(500).json({
        success: false,
        message:
          'Unable to update order status.',
      });
    }
  },
);

module.exports = router;