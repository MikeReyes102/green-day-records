const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //  Link to User
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, //  Link to Product
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true }, //  Calculate total cost
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }, //  Track payments
    orderStatus: { type: String, enum: ["processing", "shipped", "delivered", "cancelled"], default: "processing" }, // ✅ Track order status
    createdAt: { type: Date, default: Date.now }, //  Timestamp
});

module.exports = mongoose.model("Order", orderSchema);