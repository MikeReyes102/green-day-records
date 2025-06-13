import { useState } from "react";
import useAuth from "../hooks/useAuth"; // ✅ Centralized authentication check
import useTheme from "../hooks/useTheme";
import NavbarDashboard from "../components/NavbarDashboard";
import ProductGrid from "../components/ProductGrid";

const Dashboard = () => {
  useAuth(); // ✅ Automatically redirects unauthorized users
  const { theme } = useTheme(); // ✅ Theme now applied directly without redundant logic
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      {/* Dashboard navigation bar with search functionality */}
      <NavbarDashboard setSearchResults={setSearchResults} />

      <div className="flex flex-1">
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