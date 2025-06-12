import { Link, useNavigate } from "react-router-dom"; // Import routing utilities
import useTheme from "../hooks/useTheme"; // Custom hook for theme
import api from "../utils/api"; // API utility for backend requests

const Login = () => {
  const { theme } = useTheme(); // Get current theme
  const navigate = useNavigate(); // Initialize navigation function

  // Handle form submission for login
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Get email and password from form inputs
      const email = event.target[0].value;
      const password = event.target[1].value;

      // Call API to login user
      const result = await api.loginUser(email, password);

      if (result.error) {
        alert(result.error); // Show error if login fails
      } else {
        localStorage.setItem("token", result.token); // Store token in localStorage
        localStorage.setItem("role", result.role); // Store user role

        // Redirect based on user role
        if (result.role === "admin") {
          navigate("/admin"); // Admins go to Admin Dashboard
        } else {
          navigate("/dashboard"); // Regular users go to normal dashboard
        }

        console.log("Login successful:", result);
      }
    } catch (error) {
      console.error("Login failed:", error); // Log any errors
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        theme === "dark" ? "bg-background text-text" : "bg-background text-text"
      }`}
    >
      <div className="w-full max-w-md p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form
          className="flex flex-col gap-4 w-full mt-4"
          onSubmit={handleLogin}
        >
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
          {/* Login button */}
          <button
            type="submit"
            className="px-4 py-2 w-full primary-btn rounded-md transition"
          >
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
