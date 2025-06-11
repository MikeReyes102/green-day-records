const User = require("../models/User");
const Order = require("../models/Order"); // ✅ Import Order model
const Product = require("../models/Product"); // ✅ Import Product model
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({ token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Get user profile & order history with populated product details
const getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const user = await User.findById(req.user._id).select("name email role joined");

    // ✅ Fetch orders AND populate product details (title, artist, price)
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: "orderItems.product",
        select: "title artist price",
      })
      .select("orderItems totalPrice orderStatus createdAt");

    res.json({ user, orders }); // ✅ Send user info & enriched order history
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};