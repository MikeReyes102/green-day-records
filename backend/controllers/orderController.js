const Order = require("../models/Order"); // Import the Order model

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        // Validate order items and total price
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item" });
        }
        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).json({ message: "Invalid total price" });
        }

        // Create a new order instance
        const order = new Order({
            user: req.user._id, // Associate order with the logged-in user
            orderItems,
            totalPrice,
        });

        await order.save(); // Save order to database
        res.status(201).json(order); // Respond with created order
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        // Find order by ID and populate user info (name, email)
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Ensure users can only access their own orders (unless admin)
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: You cannot view this order" });
        }

        res.json(order); // Respond with order data
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
    try {
        // Admin-only access check
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        // Find all orders and populate user info
        const orders = await Order.find().populate("user", "name email");
        res.json(orders); // Respond with all orders
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Update the status of an order (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status field
        if (!status) {
            return res.status(400).json({ message: "Order status is required" });
        }

        // Find order by ID
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Ensure the order has an orderStatus field
        if (!order.orderStatus) {
            return res.status(500).json({ message: "Order does not have an orderStatus field" });
        }

        // Only admins can update order status
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        order.orderStatus = status; // Update order status
        await order.save(); // Save changes

        res.json({ message: "Order status updated", order }); // Respond with updated order
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

module.exports = { createOrder, getOrderById, getAllOrders, updateOrderStatus }; // Export controller functions