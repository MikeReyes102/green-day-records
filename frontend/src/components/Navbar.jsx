import { Link } from "react-router-dom";

// Navbar component displays the site logo and navigation links for Login and Register.
// Uses React Router's Link for client-side navigation.

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 navbar">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        Green Day Records
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-4 py-2 primary-btn rounded-md transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 secondary-btn rounded-md transition">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;