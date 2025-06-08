import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import NavbarDashboard from "../components/NavbarDashboard";
import FilterPanel from "../components/FilterPanel";
import ProductGrid from "../components/ProductGrid";

const Dashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if no authentication
    }
  }, [navigate]);

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <NavbarDashboard setSearchResults={setSearchResults}/>
      <div className="flex flex-1">
        <FilterPanel />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Product Listings</h1>
          <ProductGrid searchResults={searchResults.length > 0 ? searchResults : null} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;