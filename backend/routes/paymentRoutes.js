const express = require("express");
const { createCheckoutSession } = require("../controllers/paymentController");

const router = express.Router();

// Route to create a Stripe checkout session
// Uses controller to handle logic
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;