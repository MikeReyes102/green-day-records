import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for authentication checks
 * - Redirects to login if no token is found
 * - Reusable for any protected route
 */
const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("🔒 Access denied: No token found.");
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuth;