import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api"; // ✅ Import API helper

const ManageOrders = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const navigate = useNavigate(); // Navigation hook
  const { theme } = useTheme(); // Theme hook
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (!token) return; // If no token, do not fetch

    // Fetch orders from backend
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data); // Set orders in state
        } else {
          console.error("❌ Failed to fetch orders:", await response.json());
        }
      } catch (error) {
        console.error("❌ Network Error:", error);
      }
    };

    fetchOrders();
  }, [token]);

  // Update order status handler
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await api.updateOrderStatus(orderId, newStatus, token);
      if (!result.error) {
        // Update order status in state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        console.error("❌ Error updating order:", result.error);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      {/* Back to Dashboard button */}
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-[var(--font-heading)] text-center">Manage Orders</h1>
      <p className="text-lg text-center text-[var(--secondary-accent)] mb-6">View and update order statuses</p>

      <div className="mt-4">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-[var(--secondary-bg-color)] text-[var(--text-color)] text-left">
                  <th className="border p-4">Order ID</th>
                  <th className="border p-4">Customer</th>
                  <th className="border p-4">Total Price</th>
                  <th className="border p-4">Status</th>
                  <th className="border p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Render each order row */}
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`text-[var(--text-color)] ${
                      index % 2 === 0 ? "bg-[var(--bg-color)]" : "bg-[var(--secondary-bg-color)]"
                    }`}
                  >
                    <td className="border p-4">{order._id}</td>
                    <td className="border p-4">{order.user?.name || "Unknown Customer"}</td>
                    <td className="border p-4">${order.totalPrice}</td>
                    <td className="border p-4">{order.orderStatus}</td>
                    <td className="border p-4 flex gap-2">
                      {/* Button to mark as Processing */}
                      <button
                        onClick={() => updateOrderStatus(order._id, "Processing")}
                        className="px-3 py-1 bg-[var(--accent-color)] text-white rounded hover:bg-green-700 transition font-bold"
                      >
                        Mark as Processing
                      </button>
                      {/* Button to mark as Shipped */}
                      <button
                        onClick={() => updateOrderStatus(order._id, "Shipped")}
                        className="px-3 py-1 bg-[var(--secondary-accent)] text-white rounded hover:bg-red-700 transition font-bold"
                      >
                        Mark as Shipped
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Message if no orders found
          <p className="text-center mt-6 text-xl font-semibold text-[var(--secondary-accent)]">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;