const Product = require('../models/Product');

const buildMarketplaceFilter = ({ category, season, search }) => {
  const filter = { isAvailable: true };

  if (category) {
    filter.category = category;
  }

  if (season) {
    filter.season = season;
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  return filter;
};

const createProduct = (farmerId, productData) => {
  const { name, category, season, quantity, unit, price, description } = productData;

  return Product.create({
    farmer: farmerId,
    name,
    category,
    season,
    quantity,
    unit,
    price,
    description
  });
};

const validateProductInput = ({ name, category, season, quantity, price }) => {
  if (!name || !category || !season || !quantity || !price) {
    return 'Please fill all required product details.';
  }

  return null;
};

module.exports = {
  buildMarketplaceFilter,
  createProduct,
  validateProductInput
};
