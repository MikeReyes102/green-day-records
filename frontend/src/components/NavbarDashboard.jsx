import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

// NavbarDashboard component displays the dashboard navigation bar for authenticated users.
// Includes logo, search bar, cart/account links, and logout functionality.

const NavbarDashboard = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // For redirecting after logout

  // Handles search input changes and updates search results
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const encodedQuery = encodeURIComponent(query);
      const results = await api.searchProducts(encodedQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handles user logout by clearing local storage and redirecting to home
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT
    localStorage.removeItem("role"); // Remove stored user role
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 navbar">
      {/* Logo */}
      <Link to="/dashboard" className="text-2xl font-bold cursor-pointer">
        Green Day Records
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search records..."
        className="ml-4 mr-4 flex-grow max-w-xl p-2 rounded-md search-bar"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Cart & Account */}
      <div className="flex gap-4">
        <Link to="/cart">
          <button className="px-4 py-2 primary-btn rounded-md transition">
            Cart
          </button>
        </Link>
        <Link to="/account">
          <button className="px-4 py-2 primary-btn rounded-md transition">
            Account
          </button>
        </Link>
        <button onClick={handleLogout} className="secondary-btn transition">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default NavbarDashboard;