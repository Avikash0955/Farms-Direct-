const mongoose = require('mongoose');
const { ORDER_STATUSES } = require('../constants/appConstants');

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 1
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'Placed'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
