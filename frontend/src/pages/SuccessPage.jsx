import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// SuccessPage component displays order confirmation and saves order to backend
const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const backendURL = "http://localhost:5000/orders";
    const token = localStorage.getItem("token");

    // Save the order to the backend when the page loads
    async function saveOrder() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalPrice = cart.reduce((total, item) => total + item.price, 0);

      if (cart.length === 0 || !token) return;

      // Format order items for backend (product ID, quantity, price)
      const formattedOrderItems = cart.map((item) => ({
        product: item._id, // MongoDB product ID
        quantity: 1, // Default quantity (can be changed if cart supports quantity)
        price: item.price,
      }));

      try {
        // Send order to backend
        const response = await fetch(backendURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderItems: formattedOrderItems, totalPrice }),
        });

        if (response.ok) {
          localStorage.removeItem("cart"); // Clear cart after successful order
        } else {
          console.error("❌ Failed to store order:", await response.json());
        }
      } catch (error) {
        console.error("❌ Network Error:", error);
      }
    }
    saveOrder();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Success message */}
      <h1 className="text-3xl font-bold text-center">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-center">
        Thank you for your purchase! You will receive an email confirmation
        soon.
      </p>

      {/* Button to return to dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-4 py-2 primary-btn rounded-md transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
