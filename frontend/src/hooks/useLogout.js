import { useNavigate } from "react-router-dom";

/**
 * Custom hook for handling user logout
 * Clears authentication data and redirects to login page
 * @returns {Function} logout function
 */
const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    console.log("🚪 Logging out user...");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return logout;
};

export default useLogout;