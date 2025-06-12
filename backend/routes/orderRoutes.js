const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, orderController.createOrder); //  Secure order placement
router.get("/:id", protect, orderController.getOrderById); //  Retrieve an order
router.get("/", protect, orderController.getAllOrders); //  Admin-only: View all orders
router.patch("/:id/status", protect, orderController.updateOrderStatus); // ✅ New route

module.exports = router;