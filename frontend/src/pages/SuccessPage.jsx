import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const backendURL = "http://localhost:5000/orders";
    const token = localStorage.getItem("token");

    async function saveOrder() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalPrice = cart.reduce((total, item) => total + item.price, 0);

      if (cart.length === 0 || !token) return;

      // ✅ Ensure correct data format before sending
      const formattedOrderItems = cart.map((item) => ({
        product: item._id, // ✅ Ensure MongoDB ID is passed
        quantity: 1, // ✅ Default quantity (modify if needed)
        price: item.price,
      }));

      try {
        const response = await fetch(backendURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderItems: formattedOrderItems, totalPrice }),
        });

        if (response.ok) {
          localStorage.removeItem("cart"); // ✅ Clear cart only after successful order storage
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
      <h1 className="text-3xl font-bold text-center">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-center">
        Thank you for your purchase! You will receive an email confirmation
        soon.
      </p>

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
