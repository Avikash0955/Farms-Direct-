const Order = require('../models/Order');
const Product = require('../models/Product');
const { FARMER_ORDER_UPDATES, USER_ROLES } = require('../constants/appConstants');

const getOrdersForUser = (user) => {
  const query = user.role === USER_ROLES.FARMER
    ? { farmer: user._id }
    : { buyer: user._id };

  return Order.find(query)
    .populate('buyer', 'name email phone')
    .populate('farmer', 'name email phone')
    .populate('product', 'name unit category')
    .sort({ createdAt: -1 });
};

const placeOrder = async (buyer, orderInput) => {
  const { productId, quantity, deliveryAddress } = orderInput;
  const selectedQuantity = Number(quantity);

  if (!productId || !selectedQuantity || selectedQuantity < 1 || !deliveryAddress) {
    throw new Error('Please enter a valid quantity and delivery address.');
  }

  const product = await Product.findById(productId).populate('farmer', 'name');

  if (!product || !product.isAvailable) {
    throw new Error('This product is not available.');
  }

  if (String(product.farmer._id) === String(buyer._id)) {
    throw new Error('You cannot order your own product.');
  }

  if (selectedQuantity > product.quantity) {
    throw new Error(`Only ${product.quantity} ${product.unit} is available.`);
  }

  await Order.create({
    buyer: buyer._id,
    product: product._id,
    farmer: product.farmer._id,
    quantity: selectedQuantity,
    totalAmount: selectedQuantity * product.price,
    deliveryAddress
  });

  product.quantity -= selectedQuantity;
  if (product.quantity === 0) {
    product.isAvailable = false;
  }

  await product.save();
};

const updateFarmerOrderStatus = async (farmerId, orderId, status) => {
  if (!FARMER_ORDER_UPDATES.includes(status)) {
    throw new Error('Invalid status update.');
  }

  const order = await Order.findOne({ _id: orderId, farmer: farmerId });

  if (!order) {
    throw new Error('Order not found.');
  }

  order.status = status;
  await order.save();
};

module.exports = {
  getOrdersForUser,
  placeOrder,
  updateFarmerOrderStatus
};
