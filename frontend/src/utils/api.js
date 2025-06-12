import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = {
  // User Methods
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.response?.data?.message || "Login failed." };
    }
  },

  registerUser: async (userdata) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/register`,
        userdata
      );
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return { error: error.response?.data?.message || "Registration failed." };
    }
  },

  getUserProfile: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Profile error:", error);
      return { error: "Failed to load profile." };
    }
  },

  // Product Methods
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  searchProducts: async (query) => {
    const encodedQuery = encodeURIComponent(query);
    console.log(
      `Sending search request: ${API_BASE_URL}/products/search?q=${encodedQuery}`
    );

    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/search?q=${encodedQuery}`
      );
      console.log("Search API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  },

  getProductById: async (id) => {
    try {
      console.log(`🔍 Sending request to: ${API_BASE_URL}/products/${id}`);
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      console.log("✅ Product Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching product by ID:", error);
      return null;
    }
  },
  deleteProduct: async (productId, token) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      return { error: "Failed to delete product." };
    }
  },

  // Account Management Methods
  updateUserRole: async (userId, role, token) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user role:", error);
      return { error: "Failed to update user role." };
    }
  },

  deleteUser: async (userId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return { error: "Failed to delete user." };
    }
  },

  // Order Methods
  updateOrderStatus: async (orderId, newStatus, token) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/orders/${orderId}/status`, // ✅ Updated endpoint
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error updating order status:", error);
      return { error: "Failed to update order status." };
    }
  },
};

export default api;
