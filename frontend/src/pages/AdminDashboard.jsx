import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme"; // ✅ Import theme hook
import useLogout from "../hooks/useLogout";



// AdminDashboard component for admin overview and navigation
const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const { theme } = useTheme(); // Get current theme

  // Dashboard statistics (could be fetched from API in real app)
  const stats = [
    { title: "Total Users", count: 1_542, color: "bg-[var(--accent-color)]" },
    {
      title: "Orders Today",
      count: 239,
      color: "bg-[var(--secondary-accent)]",
    },
    { title: "Revenue", count: "$8,723", color: "bg-yellow-500" },
    { title: "Total Products", count: 312, color: "bg-purple-600" }, // New metric
    { title: "Pending Orders", count: 17, color: "bg-red-500" }, // New metric
  ];
  
  return (
    <div className={`min-h-screen ${theme} flex font-[var(--font-body)]`}>
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[var(--secondary-bg-color)] text-[var(--text-color)] p-6">
        <h2 className="text-2xl font-[var(--font-heading)] text-center">
          Admin Panel
        </h2>
        <hr className="my-4 border-gray-500" />

        {/* Navigation links for admin sections */}
        <nav className="mt-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 px-4 py-3 rounded hover:bg-[var(--accent-color)] transition">
              <span className="material-icons text-lg">person</span>
              <button
                onClick={() => navigate("/admin/users")}
                className="w-full text-left"
              >
                Manage Users
              </button>
            </li>
            <li className="flex items-center gap-3 px-4 py-3 rounded hover:bg-[var(--accent-color)] transition">
              <span className="material-icons text-lg">shopping_cart</span>
              <button
                onClick={() => navigate("/admin/orders")}
                className="w-full text-left"
              >
                Manage Orders
              </button>
            </li>
            <li className="flex items-center gap-3 px-4 py-3 rounded hover:bg-[var(--accent-color)] transition">
              <span className="material-icons text-lg">inventory</span>
              <button
                onClick={() => navigate("/admin/products")}
                className="w-full text-left"
              >
                Manage Products
              </button>
            </li>

            {/* Logout button */}
            <li className="flex items-center gap-3 px-4 py-3 rounded hover:bg-red-600 transition">
              <span className="material-icons text-lg">logout</span>
              <button
                onClick={logout}
                className="w-full text-left text-white font-bold"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-[var(--font-heading)]">Admin Dashboard</h1>
        <p className="text-lg text-[var(--secondary-accent)]">
          Welcome, Admin! Here’s a quick overview:
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {stats.map(({ title, count, color }) => (
            <div
              key={title}
              className={`p-6 rounded-lg text-white ${color} shadow-lg`}
            >
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-4xl">{count}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
