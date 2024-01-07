const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required.'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [1, 'Quantity must be at least 1.'],
  },
  id: {
    type: Number,
    required: [true, 'ID is required.'],
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;


///jrjjfjdfdj
