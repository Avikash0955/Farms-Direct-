const express = require('express');

const {
  ensureGoogleLoginReady,
  finishGoogleLogin,
  googleLoginSuccess,
  login,
  logout,
  signup,
  startGoogleLogin
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { uploadProfilePic } = require('../middleware/upload');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/signup', uploadProfilePic.single('profilePic'), asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.get('/google', ensureGoogleLoginReady, startGoogleLogin);
router.get('/google/callback', ensureGoogleLoginReady, finishGoogleLogin, googleLoginSuccess);
router.post('/logout', requireAuth, logout);

module.exports = router;
