const mongoose = require("mongoose");

// Define the schema for an order
const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Reference to the User who placed the order
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // Reference to the Product being ordered
      quantity: { type: Number, required: true }, // Quantity of the product
      price: { type: Number, required: true },    // Price at the time of order
    },
  ],
  totalPrice: { type: Number, required: true }, // Total cost of the order
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  }, // Payment status for the order
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Order progress
    default: "Processing",
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp when order was created
});

// Export the Order model
module.exports = mongoose.model("Order", orderSchema);
