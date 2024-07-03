const mongoose = require("mongoose");
cartModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "user",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("cart", cartModel);
