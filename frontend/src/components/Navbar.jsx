import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        Green Day Records
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;