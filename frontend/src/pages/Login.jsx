import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || ""); // ✅ Track role state

  // ✅ Watch for role changes in localStorage and update state
  useEffect(() => {
    const handleRoleChange = () => {
      setUserRole(localStorage.getItem("role")); // ✅ Update state when role changes
    };

    window.addEventListener("storage", handleRoleChange);
    return () => window.removeEventListener("storage", handleRoleChange);
  }, []);

  // ✅ Handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await api.loginUser(email, password);

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setUserRole(result.role); // ✅ Trigger state update
        console.log("✅ Login successful:", userRole);
        window.location.reload();
        navigate(result.role === "admin" ? "/admin" : "/dashboard");
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

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />

          <button type="submit" className="px-4 py-2 w-full primary-btn rounded-md transition">
            Login
          </button>

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