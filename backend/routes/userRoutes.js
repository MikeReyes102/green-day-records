const express = require("express");
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require("../controllers/userController");

const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

// User Authentication routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login user
router.get("/profile", protect, getUserProfile); // Get logged-in user's profile

// Admin User Management Routes
router.get("/", protect, adminOnly, getAllUsers); // Get all users (Admin-only)
router.get("/:id", protect, adminOnly, getUserById); // Get a specific user by ID (Admin-only)
router.patch("/:id", protect, adminOnly, updateUser); // Update user details (Admin-only)
router.delete("/:id", protect, adminOnly, deleteUser); // Delete a user (Admin-only)

module.exports = router;