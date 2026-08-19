const express = require('express');
const paymentRoutes = require('./paymentRoutes');

const router = express.Router();
const orders = [];
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
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    if (
      userId == null ||
      !username ||
      !items ||
      !items.length ||
      !address ||
      !razorpayOrderId ||
      !razorpayPaymentId
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details.',
      });
    }
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
    const order = {
      id: `ORD-${1001 + orders.length}`,
      userId,
      username,
      items,
      subtotal,
      tax,
      serviceCharge,
      total,
      address,

      razorpayOrderId,
      razorpayPaymentId,

      status: 'Preparing',
      paymentStatus: 'Paid',

      placedAt: new Date().toISOString(),
    };

    orders.unshift(order);

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
router.get('/user/:userId', (req, res) => {
  const userOrders = orders.filter(
    order =>
      String(order.userId) ===
      String(req.params.userId),
  );

  return res.json({
    success: true,
    orders: userOrders,
  });
});

module.exports = router;