import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import NavbarDashboard from "../components/NavbarDashboard";
// import FilterPanel from "../components/FilterPanel"; // This feature is not available just yet.
import ProductGrid from "../components/ProductGrid";

// Dashboard component displays the main product listing page for authenticated users
const Dashboard = () => {
  const { theme } = useTheme(); // Get current theme (dark/light)
  const navigate = useNavigate(); // For navigation
  const [searchResults, setSearchResults] = useState([]); // State for search/filter results

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if no authentication
    }
  }, [navigate]);

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      {/* Dashboard navigation bar with search functionality */}
      <NavbarDashboard setSearchResults={setSearchResults}/>
      <div className="flex flex-1">
        {/* FilterPanel could be added here in the future */}
        {/* <FilterPanel />  */}

        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Product Listings</h1>
          {/* Show search results if available, otherwise show all products */}
          <ProductGrid searchResults={searchResults.length > 0 ? searchResults : null} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;