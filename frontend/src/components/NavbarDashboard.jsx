import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const NavbarDashboard = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    console.log("Search Input:", query); // ✅ Debugging

    if (query.trim().length > 0) {
      const encodedQuery = encodeURIComponent(query); // ✅ Encode spaces properly
      const results = await api.searchProducts(encodedQuery);
      console.log("Search Results in Frontend:", results); // ✅ Debugging
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
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
        onChange={handleSearch} // ✅ Calls handleSearch on input change
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
        <Link to="/">
          <button className="secondary-btn transition">Log Out</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarDashboard;