const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { USER_ROLES } = require('../constants/appConstants');
const { JWT_COOKIE_NAME } = require('../utils/jwt');

const attachUser = async (req, res, next) => {
  try {
    const token = req.cookies[JWT_COOKIE_NAME];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'farmdirect_jwt_secret');
    const user = await User.findById(decoded.id).select('-password');

    if (user) {
      req.user = user;
    }

    return next();
  } catch (error) {
    res.clearCookie(JWT_COOKIE_NAME);
    return next();
  }
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'Please login to continue.');
    return res.redirect('/login');
  }

  return next();
};

const requireFarmer = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'Please login to continue.');
    return res.redirect('/login');
  }

  if (req.user.role !== USER_ROLES.FARMER) {
    req.flash('error', 'Only farmers can list products.');
    return res.redirect('/dashboard');
  }

  return next();
};

module.exports = {
  attachUser,
  requireAuth,
  requireFarmer
};
