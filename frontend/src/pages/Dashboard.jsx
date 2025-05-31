import NavbarDashboard from "../components/NavbarDashboard";
import FilterPanel from "../components/FilterPanel";
import ProductGrid from "../components/ProductGrid";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavbarDashboard />
      <div className="flex flex-1">
        <FilterPanel />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Product Listings</h1>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;