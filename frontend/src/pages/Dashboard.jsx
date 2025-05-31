import NavbarDashboard from "../components/NavbarDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavbarDashboard />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">🛒 Product Listings</div>
          <div className="bg-gray-800 p-4 rounded-lg">🔍 Search</div>
          <div className="bg-gray-800 p-4 rounded-lg">🛍 Cart Access</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;