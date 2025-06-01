import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // Initialize navigation function

  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/dashboard"); // Simulate successful registration
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <div className="w-full max-w-md p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 w-full rounded bg-nav-bg-color border border-secondary-accent text-text"
          />
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
