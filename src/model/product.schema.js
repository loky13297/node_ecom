const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productImg: {
    type: [String],
    required: true,
    trim: true,
  },
  productQuantity: {
    type: Number,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  discountPrice: {
    type: Number,
    required: true,
    trim: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("products", productSchema);
