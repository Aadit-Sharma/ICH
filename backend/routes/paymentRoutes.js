const express = require('express');
const crypto = require('crypto');
const razorpay = require('../services/razorpayService');

const router = express.Router();
const paymentOrders = new Map();
/*
 * Temporary development store.
 *
 * Later, when we add MongoDB, this will be replaced
 * by a Payment/Order database collection.
 */

 /*
 * CREATE RAZORPAY ORDER
 */
router.post('/create-order', async (req, res) => {
  try {
    const {amount} = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'A valid amount is required.',
      });
    }

    const amountInPaise = Math.round(
      Number(amount) * 100,
    );

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `ICH-${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(options);

    /*
     * Store the server-created Razorpay order ID.
     *
     * This is the ID we will trust during verification.
     */
    paymentOrders.set(order.id, {
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
      },
    });
  } catch (error) {
    console.error(
      'Razorpay order creation failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Unable to create Razorpay order.',
    });
  }
});

/*
 * VERIFY RAZORPAY PAYMENT
 */
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Missing Razorpay payment details.',
      });
    }

    /*
     * IMPORTANT:
     *
     * Do not trust the order ID simply because
     * the mobile app sent it.
     *
     * Find the order that OUR SERVER created.
     */
    const serverOrder =
      paymentOrders.get(razorpay_order_id);

    if (!serverOrder) {
      return res.status(400).json({
        success: false,
        message:
          'Razorpay order was not created by this server.',
      });
    }

    /*
     * Use the SERVER-STORED order ID.
     */
    const body =
      serverOrder.razorpayOrderId +
      '|' +
      razorpay_payment_id;

    /*
     * Generate the expected Razorpay signature.
     */
    const expectedSignature =
      crypto
        .createHmac(
          'sha256',
          process.env.RAZORPAY_KEY_SECRET,
        )
        .update(body)
        .digest('hex');

    /*
     * Timing-safe comparison.
     */
    const receivedSignature =
      Buffer.from(
        razorpay_signature,
        'hex',
      );

    const generatedSignature =
      Buffer.from(
        expectedSignature,
        'hex',
      );

    const signaturesMatch =
      receivedSignature.length ===
        generatedSignature.length &&
      crypto.timingSafeEqual(
        generatedSignature,
        receivedSignature,
      );

    if (!signaturesMatch) {
      return res.status(400).json({
        success: false,
        message:
          'Payment signature verification failed.',
      });
    }

    /*
     * Payment is cryptographically verified.
     */
    serverOrder.status = 'VERIFIED';
    serverOrder.paymentId =
      razorpay_payment_id;
    serverOrder.signature =
      razorpay_signature;
    serverOrder.verifiedAt =
      new Date().toISOString();

    paymentOrders.set(razorpay_order_id, {
  status: 'VERIFIED',
  paymentId: razorpay_payment_id,
});

return res.json({
  success: true,
  message: 'Payment verified successfully.',
  payment: {
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
  },
});
  } catch (error) {
    console.error(
      'Payment verification failed:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Unable to verify payment.',
    });
  }
});
module.exports = router;
module.exports.paymentOrders = paymentOrders;