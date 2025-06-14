// Import the Stripe library and initialize it with the secret key from environment variables
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller function to create a Stripe Checkout session
const createCheckoutSession = async (req, res) => {
  try {
    // Extract the cart from the request body
    const { cart } = req.body;
    // If the cart is empty or not provided, return an error
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept card payments
      mode: "payment", // One-time payment
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd", // Set currency to USD
          product_data: { name: item.title }, // Product name from cart item
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: 1, // Set quantity to 1 for each item
      })),
      // The URLs can be switch to localhost for local environments
      success_url: "https://green-day-records.netlify.app/success", // Redirect URL on success 
      cancel_url: "https://green-day-records.netlify.app/cart", // Redirect URL if canceled
    });

    // Respond with the session URL for the client to redirect to Stripe Checkout
    res.json({ url: session.url });
  } catch (error) {
    // Log and return any errors that occur during session creation
    console.error("❌ Stripe Error:", error);
    res.status(500).json({ error: "Payment processing failed." });
  }
};

// Export the controller function
module.exports = { createCheckoutSession };