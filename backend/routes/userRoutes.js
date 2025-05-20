const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// register and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected route to get user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
