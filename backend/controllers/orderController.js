const Order = require("../models/Order");

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

        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice,
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Ensure users can only access their own orders (unless admin)
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: You cannot view this order" });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        // Admin-only access
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        // ✅ Populate 'user' field to include customer name & email
        const orders = await Order.find().populate("user", "name email");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Order status is required" });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!order.orderStatus) {
            return res.status(500).json({ message: "Order does not have an orderStatus field" });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        order.orderStatus = status;
        await order.save();

        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createOrder, getOrderById, getAllOrders, updateOrderStatus };