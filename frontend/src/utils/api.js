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
    console.log(`Sending search request: ${API_BASE_URL}/products/search?q=${encodedQuery}`);

    try {
      const response = await axios.get(`${API_BASE_URL}/products/search?q=${encodedQuery}`);
      console.log("Search API Response:", response.data); // ✅ Debugging API Response
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  }
};

export default api;
