import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import { users, products } from './data/index';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bike-spare-parts';

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Although products don't strictly require a user right now, it's good practice.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
