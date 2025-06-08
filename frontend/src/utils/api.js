import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = {
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.response?.data?.message || "Login failed." };
    }
  },

  registerUser: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, { name, email, password });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return { error: error.response?.data?.message || "Registration failed." };
    }
  }

}

export default api;
