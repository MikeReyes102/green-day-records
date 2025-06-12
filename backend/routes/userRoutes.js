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

// User Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// ✅ Admin User Management Routes
router.get("/", protect, adminOnly, getAllUsers); // Get all users (Admin-only)
router.get("/:id", protect, adminOnly, getUserById); // Get a specific user by ID
router.patch("/:id", protect, adminOnly, updateUser); // Update user details
router.delete("/:id", protect, adminOnly, deleteUser); // Delete a user

module.exports = router;