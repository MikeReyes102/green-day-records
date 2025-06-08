import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";



const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // Initialize navigation function

const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const email = event.target[0].value; // Get email input value
    const password = event.target[1].value; // Get password input value
    
    const result = await api.loginUser(email, password);

    if (result.error) {
      alert(result.error); // Display error message
    } else {
      localStorage.setItem("token", result.token); // Store JWT token
      navigate("/dashboard"); // Redirect user after successful login
      console.log("Login successful:", result);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <div className="w-full max-w-md p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
          <input
            type="password"
            placeholder="Password"
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
