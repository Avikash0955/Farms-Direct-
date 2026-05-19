const express = require('express');

const {
  renderOrders,
  storeOrder,
  updateOrderStatus
} = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(renderOrders));
router.post('/', requireAuth, asyncHandler(storeOrder));
router.post('/:id/status', requireAuth, asyncHandler(updateOrderStatus));

module.exports = router;
