const Product = require('../models/Product');
const { createProduct, validateProductInput } = require('../services/productService');

const renderAddProduct = (req, res) => {
  res.render('pages/add-product', {
    title: 'Add Product'
  });
};

const storeProduct = async (req, res) => {
  const validationError = validateProductInput(req.body);

  if (validationError) {
    req.flash('error', validationError);
    return res.redirect('/products/new');
  }

  await createProduct(req.user._id, req.body);
  req.flash('success', 'Product added to the marketplace.');
  return res.redirect('/dashboard');
};

const toggleProductAvailability = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, farmer: req.user._id });

  if (!product) {
    req.flash('error', 'Product not found.');
    return res.redirect('/dashboard');
  }

  product.isAvailable = !product.isAvailable;
  await product.save();
  req.flash('success', `Product marked as ${product.isAvailable ? 'available' : 'unavailable'}.`);
  return res.redirect('/dashboard');
};

const deleteProduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id, farmer: req.user._id });
  req.flash('success', 'Product deleted successfully.');
  res.redirect('/dashboard');
};

module.exports = {
  renderAddProduct,
  storeProduct,
  toggleProductAvailability,
  deleteProduct
};
