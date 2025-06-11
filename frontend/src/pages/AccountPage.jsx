import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); // ✅ Get stored auth token

  useEffect(() => {
    async function fetchUserData() {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // ✅ Store user details
          setOrders(data.orders); // ✅ Store order history with product info
        } else {
          console.error(
            "❌ Failed to fetch account data:",
            await response.json()
          );
        }
      } catch (error) {
        console.error("❌ Network Error:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Account Settings</h1>

        {/* Account Details */}
        {user ? (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">Name: {user.name}</p>
            <p className="text-sm">Email: {user.email}</p>
            <p className="text-sm">Joined: {user.joined}</p>
          </div>
        ) : (
          <p className="text-center">Loading account details...</p>
        )}

        {/* Order History */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Order History</h2>
          {orders.length > 0 ? (
            <ul className="list-disc list-inside text-text">
              {orders.map((order) => (
                <li key={order._id} className="mt-2">
                  {" "}
                  {/* ✅ Add unique key here */}
                  {order.orderItems.map((item) => (
                    <p key={item.product._id}>
                      {" "}
                      {/* ✅ Assign a unique key to each item */}
                      {item.quantity}x {item.product.title} by{" "}
                      {item.product.artist} - ${item.product.price}
                    </p>
                  ))}
                  <p className="text-sm">
                    Status: {order.orderStatus} | Total: ${order.totalPrice}
                  </p>
                  <p className="text-xs text-gray-400">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 primary-btn rounded-md transition"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <button className="w-full sm:w-auto px-4 py-2 primary-btn rounded-md transition">
            Edit Account
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-4 py-2 secondary-btn rounded-md transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
