const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);
