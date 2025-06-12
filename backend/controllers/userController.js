const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// Generate JWT token for authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ message: "User already exists" });

  // Create new user
  const user = await User.create({ name, email, password });

  if (user) {
    // Respond with JWT token
    res.status(201).json({ token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const user = await User.findOne({ email });

  // Check password and respond with token and role
  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id), role: user.role }); // ✅ Return role
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
    // Fetch user info (excluding password)
    const user = await User.findById(req.user._id).select("name email role joined");
    // Fetch user's orders and populate product details
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: "orderItems.product",
        select: "title artist price",
      })
      .select("orderItems totalPrice orderStatus createdAt");

    res.json({ user, orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

// ✅ Get all users (Admin-only)
const getAllUsers = async (req, res) => {
  // Only allow admin access
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  try {
    // Fetch all users, exclude passwords
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ✅ Get user by ID
const getUserById = async (req, res) => {
  try {
    // Find user by ID, exclude password
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// ✅ Update user (Admin-only)
const updateUser = async (req, res) => {
  // Only allow admin access
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  try {
    // Update user by ID, return updated user (exclude password)
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// ✅ Delete user (Admin-only)
const deleteUser = async (req, res) => {
  // Only allow admin access
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  try {
    // Delete user by ID
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};