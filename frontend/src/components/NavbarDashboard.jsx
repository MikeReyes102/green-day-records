import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        Green Day Records
      </Link>

      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search Records..." 
        className="px-4 py-2 w-64 rounded bg-gray-700 border border-gray-600 text-white"
      />

      {/* Cart & Account */}
      <div className="flex gap-4">
        <Link to="/cart">
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md transition">
            Cart
          </button>
        </Link>
        <Link to="/account">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition">
            Account
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarDashboard;