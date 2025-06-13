import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ Ensure authentication
import api from "../utils/api";

const SuccessPage = () => {
  useAuth(); // ✅ Protects this page for authenticated users
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    if (cart.length === 0) return;

    const saveOrder = async () => {
      try {
        await api.saveOrder(cart, totalPrice);
        localStorage.removeItem("cart"); // ✅ Clear cart on success
      } catch (error) {
        console.error("❌ Error saving order:", error);
        setErrorMessage("Failed to save order. Please contact support.");
      }
    };

    saveOrder();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">🎉 Order Placed Successfully!</h1>
      <p className="text-lg text-center">Thank you for your purchase! You will receive an email confirmation soon.</p>

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

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