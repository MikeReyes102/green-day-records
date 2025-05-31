import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link to="/dashboard" className="text-2xl font-bold cursor-pointer">
        Green Day Records
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search records..."
        className="ml-4 flex-grow max-w-xl p-2 rounded-md bg-gray-800 text-white border border-gray-600 outline-none"
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
        <Link to="/">
          <button className="hover:text-red-500 transition">Log Out</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
