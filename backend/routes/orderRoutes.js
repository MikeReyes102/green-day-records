const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new order (protected)
router.post("/", protect, orderController.createOrder); //  Secure order placement

// Route to get a specific order by ID (protected)
router.get("/:id", protect, orderController.getOrderById); //  Retrieve an order

// Route to get all orders (protected, typically admin-only)
router.get("/", protect, orderController.getAllOrders); //  Admin-only: View all orders

// Route to update the status of an order (protected)
router.patch("/:id/status", protect, orderController.updateOrderStatus); // ✅ New route

module.exports = router;