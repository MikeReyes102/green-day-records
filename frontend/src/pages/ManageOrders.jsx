import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ Ensure admin-only access
import useTheme from "../hooks/useTheme";
import api from "../utils/api"; // ✅ Centralized API methods

const ManageOrders = () => {
  useAuth(); // ✅ Protects this admin page from unauthorized users
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // ✅ UI error handling

  // ✅ Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        setErrorMessage("Failed to load orders. Please try again.");
      }
    };

    fetchOrders();
  }, []);

  // ✅ Update order status handler
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("❌ Error updating order:", error);
      setErrorMessage("Failed to update order status. Please try again.");
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
      <p className="text-lg text-center text-[var(--secondary-accent)] mb-6">
        View and update order statuses
      </p>

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

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
          <p className="text-center mt-6 text-xl font-semibold text-[var(--secondary-accent)]">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;