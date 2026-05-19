const { USER_ROLES } = require('../constants/appConstants');
const {
  getOrdersForUser,
  placeOrder,
  updateFarmerOrderStatus
} = require('../services/orderService');

const renderOrders = async (req, res) => {
  const orders = await getOrdersForUser(req.user);

  res.render('pages/orders', {
    title: 'Orders',
    orders
  });
};

const storeOrder = async (req, res) => {
  try {
    await placeOrder(req.user, req.body);
    req.flash('success', 'Order placed successfully.');
    return res.redirect('/orders');
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('/marketplace');
  }
};

const updateOrderStatus = async (req, res) => {
  if (req.user.role !== USER_ROLES.FARMER) {
    req.flash('error', 'Only farmers can update order status.');
    return res.redirect('/orders');
  }

  try {
    await updateFarmerOrderStatus(req.user._id, req.params.id, req.body.status);
    req.flash('success', 'Order status updated.');
    return res.redirect('/orders');
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('/orders');
  }
};

module.exports = {
  renderOrders,
  storeOrder,
  updateOrderStatus
};
