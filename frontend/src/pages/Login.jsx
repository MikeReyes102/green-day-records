import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import routing utilities
import useTheme from "../hooks/useTheme"; // Custom hook for theme
import api from "../utils/api"; // API utility for backend requests

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // ✅ Use state for controlled inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // ✅ Handle form submission for login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // ✅ Login user via API
      const result = await api.loginUser(email, password);

      if (result.error) {
        setErrorMessage(result.error); // ✅ Display error message in UI
      } else {
        // ✅ Get stored role from localStorage (already handled in `api.js`)
        const role = localStorage.getItem("role");

        // ✅ Redirect based on role
        navigate(role === "admin" ? "/admin" : "/dashboard");

        console.log("✅ Login successful:", result);
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme}`}>
      <div className="w-full max-w-md p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {/* Display error message if login fails */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleLogin}>
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // ✅ Controlled input
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // ✅ Controlled input
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />

          {/* Login button */}
          <button type="submit" className="px-4 py-2 w-full primary-btn rounded-md transition">
            Login
          </button>

          {/* Cancel button, returns to home */}
          <Link to="/" className="w-full">
            <button className="px-4 py-2 w-full secondary-btn rounded-md transition">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;