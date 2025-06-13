import axios from "axios";

// ✅ Set the backend API base URL dynamically
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ Configure Axios defaults for automatic request handling
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

// ✅ Enable logging only in development mode
const isDev = import.meta.env.VITE_ENV === "development";

const api = {
  /**
   * Authenticate a user, store session data, and return their role
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User data or error message
   */
  loginUser: async (email, password) => {
    try {
      if (isDev) console.log(`🔑 Attempting login: ${email}`);

      const response = await axios.post("/users/login", { email, password });

      if (response.data?.token && response.data?.role) {
        // ✅ Store authentication details in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        if (isDev) console.log("✅ Login successful:", response.data);
        return response.data;
      } else {
        throw new Error("Invalid login response: Missing token or role.");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      throw new Error(err.response?.data?.message || "Login failed.");
    }
  },

  /**
   * Register a new user
   * @param {Object} userdata - User registration details
   * @returns {Promise<Object>} Newly created user data or error message
   */
  registerUser: async (userdata) => {
    try {
      if (isDev) console.log("📝 Registering user:", userdata);
      const response = await axios.post("/users/register", userdata);
      if (isDev) console.log("✅ Registration successful:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Registration error:", err);
      throw new Error(err.response?.data?.message || "Registration failed.");
    }
  },

  /**
   * Get the profile of the currently logged-in user
   * @returns {Promise<Object>} User profile data or error message
   */
  getUserProfile: async () => {
    try {
      if (isDev) console.log("📂 Fetching user profile...");
      const response = await axios.get("/users/profile");
      if (isDev) console.log("✅ Profile data received:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Profile error:", err);
      throw new Error("Failed to load profile.");
    }
  },

  // ✅ Product Methods
  getProducts: async () => {
    try {
      if (isDev) console.log("📦 Fetching all products...");
      const response = await axios.get("/products");
      if (isDev)
        console.log("✅ Products fetched successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      throw new Error("Failed to fetch products.");
    }
  },

  getProductById: async (id) => {
    try {
      if (isDev) console.log(`🔍 Fetching product ID: ${id}`);
      const response = await axios.get(`/products/${id}`);
      if (isDev) console.log("✅ Product data received:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error fetching product:", err);
      throw new Error("Failed to fetch product.");
    }
  },

  searchProducts: async (query) => {
    try {
      if (isDev) console.log(`🔎 Searching products with query: "${query}"`);
      const response = await axios.get(
        `/products/search?q=${encodeURIComponent(query)}`
      );
      if (isDev) console.log("✅ Search results received:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error searching products:", err);
      throw new Error("Search failed.");
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      if (isDev)
        console.log(`✏️ Updating product ID: ${productId}`, productData);

      const response = await axios.patch(`/products/${productId}`, productData);

      if (isDev) console.log("✅ Product updated:", response.data);

      return response.data;
    } catch (err) {
      console.error("❌ Error updating product:", err);
      throw new Error("Failed to update product.");
    }
  },

  deleteProduct: async (productId) => {
    try {
      if (isDev) console.log(`🗑️ Deleting product ID: ${productId}`);
      const response = await axios.delete(`/products/${productId}`);
      if (isDev) console.log("✅ Product deleted successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      throw new Error("Failed to delete product.");
    }
  },

  // Order Methods
  createCheckoutSession: async (cart) => {
    try {
      if (isDev) console.log("💳 Creating checkout session...");

      const response = await axios.post("/api/create-checkout-session", {
        cart,
      });

      if (isDev) console.log("✅ Checkout session created:", response.data);

      return response.data;
    } catch (err) {
      console.error("❌ Checkout error:", err);
      throw new Error("Failed to create checkout session.");
    }
  },

  /**
   * ✅ Save an order to the backend
   * @param {Array} cart - List of items in the cart
   * @param {number} totalPrice - Total price of the order
   * @returns {Promise<Object>} Order confirmation or error message
   */
  saveOrder: async (cart, totalPrice) => {
    try {
      if (isDev) console.log("🛒 Saving order to backend...");

      const formattedOrderItems = cart.map((item) => ({
        product: item._id,
        quantity: 1, // Default quantity (can be adjusted if needed)
        price: item.price,
      }));

      const response = await axios.post("/orders", {
        orderItems: formattedOrderItems,
        totalPrice,
      });

      if (isDev) console.log("✅ Order saved successfully:", response.data);

      return response.data;
    } catch (err) {
      console.error("❌ Error saving order:", err);
      throw new Error("Failed to save order.");
    }
  },

  // ✅ Order Management

  /**
   * ✅ Fetch all orders
   * @returns {Promise<Array>} List of orders or error message
   */
  getOrders: async () => {
    try {
      if (isDev) console.log("📦 Fetching all orders...");

      const response = await axios.get("/orders");

      if (isDev) console.log("✅ Orders fetched successfully:", response.data);

      return response.data;
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      throw new Error("Failed to fetch orders.");
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      if (isDev)
        console.log(`🚀 Updating order ID: ${orderId} to status: ${newStatus}`);
      const response = await axios.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      if (isDev) console.log("✅ Order status updated:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error updating order status:", err);
      throw new Error("Failed to update order status.");
    }
  },

  // ✅ User Account Management

  /**
   * ✅ Fetch all users
   * @returns {Promise<Array>} List of users or error message
   */
  getUsers: async () => {
    try {
      if (isDev) console.log("📂 Fetching all users...");

      const response = await axios.get("/users");

      if (isDev) console.log("✅ Users fetched successfully:", response.data);

      return response.data;
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      throw new Error("Failed to fetch users.");
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      if (isDev) console.log(`🔁 Updating user ID: ${userId} to role: ${role}`);
      const response = await axios.patch(`/users/${userId}`, { role });
      if (isDev) console.log("✅ User role updated:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error updating user role:", err);
      throw new Error("Failed to update user role.");
    }
  },

  deleteUser: async (userId) => {
    try {
      if (isDev) console.log(`⚠️ Deleting user ID: ${userId}`);
      const response = await axios.delete(`/users/${userId}`);
      if (isDev) console.log("✅ User deleted successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      throw new Error("Failed to delete user.");
    }
  },
};

export default api;
