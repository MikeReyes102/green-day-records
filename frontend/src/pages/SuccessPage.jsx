import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function saveOrder() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      await fetch("/api/store-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      localStorage.removeItem("cart"); // 🧹 Clear cart after purchase
    }

    saveOrder();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">🎉 Order Placed Successfully!</h1>
      <p className="text-lg text-center">Thank you for your purchase! You will receive an email confirmation soon.</p>

      <button onClick={() => navigate("/dashboard")} className="mt-6 px-4 py-2 primary-btn rounded-md transition">
        Back to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;