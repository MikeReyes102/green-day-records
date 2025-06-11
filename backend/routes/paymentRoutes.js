const express = require("express");
const { createCheckoutSession } = require("../controllers/paymentController");

const router = express.Router();

// ✅ Use controller instead of writing logic directly in the route
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;