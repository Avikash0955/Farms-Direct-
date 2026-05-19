const {
  FARMER_ORDER_UPDATES,
  PRODUCT_CATEGORIES,
  PRODUCT_SEASONS,
  PRODUCT_UNITS,
  USER_ROLES
} = require('../constants/appConstants');

const attachViewLocals = (req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.query = req.query;
  res.locals.FARMER_ORDER_UPDATES = FARMER_ORDER_UPDATES;
  res.locals.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
  res.locals.PRODUCT_SEASONS = PRODUCT_SEASONS;
  res.locals.PRODUCT_UNITS = PRODUCT_UNITS;
  res.locals.USER_ROLES = USER_ROLES;
  next();
};

module.exports = attachViewLocals;
