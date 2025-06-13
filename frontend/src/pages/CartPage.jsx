import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";

// CartPage component displays the user's shopping cart and handles checkout
const CartPage = () => {
  const { theme } = useTheme(); // Get current theme (dark/light)
  const navigate = useNavigate(); // For navigation
  const [cart, setCart] = useState([]); // Cart state

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  // Remove an item from the cart
  function removeFromCart(productId) {
    const updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  const backendURL = "http://localhost:5000/api/create-checkout-session"; // Backend endpoint for Stripe checkout

  // Handle checkout: send cart to backend and redirect to Stripe
  async function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("❌ Checkout Error:", data.error);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
    }
  }

  // Calculate total price of items in cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <div className="w-full max-w-lg p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>

        {/* Cart Items List */}
        <div className="mt-4">
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="mb-4 flex justify-between">
                <div>
                  <p className="text-lg font-semibold">{item.title} - {item.artist}</p>
                  <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500">Remove</button>
              </div>
            ))
          )}
        </div>

        {/* Total Price */}
        <h2 className="text-xl font-semibold mt-4 text-center">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button onClick={handleCheckout} className="w-full px-4 py-2 primary-btn rounded-md transition">
            Checkout
          </button>
          <button onClick={() => navigate("/dashboard")} className="w-full px-4 py-2 secondary-btn rounded-md transition">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;