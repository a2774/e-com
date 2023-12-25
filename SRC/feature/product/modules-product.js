const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    
  },
  sizes: {
    type: [String],
  }, 

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required for rating."],
      },
      rating: {
        type: Number,
        required: [true, "Rating is required."],
        min: [1, "Rating must be at least 1."],
        max: [5, "Rating must be at most 5."],
      },
      comment: {
        type: String,
      },
    },
  ],
});

// Middleware to handle validation errors
productSchema.post('save', function (error, doc, next) {
  if (error.name === 'ValidationError') {
    const errors = {};
    for (const field in error.errors) {
      errors[field] = error.errors[field].message;
    }
    next({ errors });
  } else {
    next(error);
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
