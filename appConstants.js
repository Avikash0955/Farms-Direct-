const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');

const USER_ROLES = {
  FARMER: 'farmer',
  CUSTOMER: 'customer'
};

const PRODUCT_CATEGORIES = ['Vegetables', 'Fruits', 'Organic Products', 'Grains'];
const PRODUCT_SEASONS = ['Summer', 'Winter', 'Rainy', 'All Season'];
const PRODUCT_UNITS = ['kg', 'quintal', 'piece', 'bundle', 'dozen'];
const ORDER_STATUSES = ['Placed', 'Accepted', 'Delivered', 'Cancelled'];
const FARMER_ORDER_UPDATES = ['Accepted', 'Delivered', 'Cancelled'];

const PROFILE_UPLOAD = {
  dir: path.join(ROOT_DIR, 'uploads', 'profile-pics'),
  publicPath: '/uploads/profile-pics',
  maxSize: 2 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
};

module.exports = {
  ROOT_DIR,
  USER_ROLES,
  PRODUCT_CATEGORIES,
  PRODUCT_SEASONS,
  PRODUCT_UNITS,
  ORDER_STATUSES,
  FARMER_ORDER_UPDATES,
  PROFILE_UPLOAD
};
