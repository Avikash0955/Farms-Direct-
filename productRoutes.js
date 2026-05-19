const express = require('express');

const {
  deleteProduct,
  renderAddProduct,
  storeProduct,
  toggleProductAvailability
} = require('../controllers/productController');
const { requireFarmer } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/new', requireFarmer, renderAddProduct);
router.post('/', requireFarmer, asyncHandler(storeProduct));
router.post('/:id/toggle', requireFarmer, asyncHandler(toggleProductAvailability));
router.delete('/:id', requireFarmer, asyncHandler(deleteProduct));

module.exports = router;
