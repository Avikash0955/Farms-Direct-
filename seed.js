require('dotenv').config();

const mongoose = require('mongoose');

const Product = require('../src/models/Product');
const User = require('../src/models/User');
const seedProducts = require('../data/seedProducts');
const { USER_ROLES } = require('../src/constants/appConstants');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmdirect';

const seedDemoData = async () => {
  await mongoose.connect(MONGO_URI);

  let farmer = await User.findOne({ email: 'demo.farmer@farmdirect.com' });

  if (!farmer) {
    farmer = await User.create({
      name: 'Demo Farmer',
      email: 'demo.farmer@farmdirect.com',
      password: 'demo123',
      role: USER_ROLES.FARMER,
      phone: '9876543210',
      address: 'FarmDirect Demo Village, Punjab',
      authProvider: 'local'
    });
  }

  let inserted = 0;
  let updated = 0;

  for (const product of seedProducts) {
    const result = await Product.updateOne(
      {
        farmer: farmer._id,
        name: product.name
      },
      {
        $set: {
          ...product,
          farmer: farmer._id,
          isAvailable: product.quantity > 0
        }
      },
      {
        upsert: true
      }
    );

    if (result.upsertedCount) {
      inserted += 1;
    } else if (result.modifiedCount) {
      updated += 1;
    }
  }

  console.log(`Demo farmer: demo.farmer@farmdirect.com / demo123`);
  console.log(`Products inserted: ${inserted}`);
  console.log(`Products updated: ${updated}`);
  console.log(`Total demo products available: ${seedProducts.length}`);

  await mongoose.disconnect();
};

seedDemoData().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
