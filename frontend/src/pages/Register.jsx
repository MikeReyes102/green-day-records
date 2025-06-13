import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

// Register component for user sign up
const Register = () => {
  const { theme } = useTheme(); // Get current theme for styling
  const navigate = useNavigate(); // Initialize navigation function

  // Handle registration form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Collect user input from form fields
    const userData = {
      name: event.target[0].value.trim(),
      email: event.target[1].value.trim(),
      password: event.target[2].value.trim(),
    };

    try {
      // Call API to register user
      const result = await api.registerUser(userData);

      if (result.error) {
        alert(result.error); // Show error if registration fails
      } else {
        localStorage.setItem("token", result.token); // Store token on success
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("Registration failed:", error); // Log network or server errors
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-background text-text" : "bg-background text-text"
      }`}
    >
      <div className="w-full max-w-md p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form
          className="flex flex-col gap-4 w-full mt-4"
          onSubmit={handleRegister}
        >
          {/* Name input */}
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
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
          {/* Register button */}
          <button
            type="submit"
            className="px-4 py-2 w-full primary-btn rounded-md transition"
          >
            Register
          </button>
        </form>

        {/* Cancel Button */}
        <div className="flex justify-center mt-4">
          <Link to="/" className="w-full">
            <button className="px-4 py-2 w-full secondary-btn rounded-md transition">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
