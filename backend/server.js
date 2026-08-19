require('dotenv').config();

const express = require('express');
const cors = require('cors');

const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ICH Backend is running',
  });
});

app.get('/api/payment/config', (req, res) => {
  res.json({
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ICH Backend running on port ${PORT}`);
});