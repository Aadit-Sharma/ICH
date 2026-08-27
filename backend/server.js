const express = require('express');
const cors = require('cors');
require('dotenv').config();
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const addressRoutes = require('./routes/addressRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(cors());
app.use(express.json());

app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/users', userRoutes);
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

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`ICH Backend running on port ${PORT}`);
  });
};

startServer();