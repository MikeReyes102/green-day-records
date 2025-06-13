import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // ✅ Import API functions

const AccountPage = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch user details & orders using API method
  useEffect(() => {
    async function fetchAccountData() {
      if (!token) return;

      try {
        const data = await api.getUserProfile();
        setUser(data.user);
        setOrders(data.orders);
      } catch (error) {
        console.error("❌ Failed to fetch account data:", error);
      }
    }

    fetchAccountData();
  }, [token]);

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
                  {order.orderItems.map((item) => (
                    <p key={item.product._id}>
                      {item.quantity}x {item.product.title} by {item.product.artist} - ${item.product.price}
                    </p>
                  ))}
                  <p className="text-sm">Status: {order.orderStatus} | Total: ${order.totalPrice}</p>
                  <p className="text-xs text-gray-400">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>

        {/* Theme Toggle Button */}
        <div className="flex justify-center mt-6">
          <button onClick={toggleTheme} className="px-4 py-2 primary-btn rounded-md transition">
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Edit Account and Back Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <button className="w-full sm:w-auto px-4 py-2 primary-btn rounded-md transition">Edit Account</button>
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