const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;
        const order = new Order({
            user: req.user._id, //  Attach user ID from JWT
            orderItems,
            totalPrice,
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};