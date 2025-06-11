const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title },
          unit_amount: Math.round(item.price * 100), // ✅ Convert to cents
        },
        quantity: 1,
      })),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res.status(500).json({ error: "Payment processing failed." });
  }
};

module.exports = { createCheckoutSession };