import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // ✅ Use state for controlled inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // ✅ Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // ✅ Register user via API
      const result = await api.registerUser({ name, email, password });

      if (result.error) {
        setErrorMessage(result.error); // ✅ Display error message in UI
      } else {
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
        window.location.reload();

        console.log("✅ Registration successful:", result);
      }
    } catch (error) {
      console.error("❌ Registration failed:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme}`}>
      <div className="w-full max-w-md p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {/* Error Message Display */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleRegister}>
          {/* Name input */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // ✅ Controlled input
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
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

          {/* Register button */}
          <button type="submit" className="px-4 py-2 w-full primary-btn rounded-md transition">
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