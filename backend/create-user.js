require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      'Connected to database:',
      mongoose.connection.name,
    );

    const existingUser = await User.findOne({
      username: 'jamesd',
    });

    if (existingUser) {
      console.log('jamesd already exists.');
      console.log('userId:', existingUser.userId);

      await mongoose.disconnect();
      return;
    }

    const passwordHash =
      await bcrypt.hash('jamesd123', 10);

    const user = await User.create({
      userId: 4,
      username: 'jamesd',
      passwordHash,
    });

    console.log('User created successfully.');
    console.log('userId:', user.userId);
    console.log('username:', user.username);

    await mongoose.disconnect();
  } catch (error) {
    console.error(
      'User creation failed:',
      error,
    );

    await mongoose.disconnect();
    process.exit(1);
  }
};

createUser();