const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  status: {
    type: String,
    enum: ["pending", "preparing", "cancelled", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
