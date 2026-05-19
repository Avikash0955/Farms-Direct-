const express = require('express');

const {
  renderAbout,
  renderDashboard,
  renderHome,
  renderLogin,
  renderMarketplace,
  renderProfile,
  renderSignup
} = require('../controllers/pageController');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(renderHome));
router.get('/signup', renderSignup);
router.get('/login', renderLogin);
router.get('/dashboard', requireAuth, asyncHandler(renderDashboard));
router.get('/marketplace', asyncHandler(renderMarketplace));
router.get('/profile', requireAuth, renderProfile);
router.get('/about', renderAbout);

module.exports = router;
