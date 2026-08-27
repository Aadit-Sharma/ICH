require('dotenv').config();

const dns = require('dns');

dns.setServers([
  '8.8.8.8',
  '1.1.1.1',
]);

const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log('MONGODB CONNECTION SUCCESS');
    process.exit(0);
  })
  .catch(error => {
    console.error('MONGODB CONNECTION FAILED');
    console.error(error);
    process.exit(1);
  });