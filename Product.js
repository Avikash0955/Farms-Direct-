const mongoose = require('mongoose');
const {
  PRODUCT_CATEGORIES,
  PRODUCT_SEASONS,
  PRODUCT_UNITS
} = require('../constants/appConstants');

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true
    },
    season: {
      type: String,
      enum: PRODUCT_SEASONS,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unit: {
      type: String,
      enum: PRODUCT_UNITS,
      default: 'kg'
    },
    price: {
      type: Number,
      required: true,
      min: 1
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
