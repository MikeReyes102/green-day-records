import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ Ensure admin-only access
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const ManageProducts = () => {
  useAuth(); // ✅ Protects this admin page from unauthorized users
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // ✅ Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await api.getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // ✅ Handle product deletion
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("❌ Delete failed:", error);
    }
  };

  // ✅ Navigate to edit product page
  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      {/* Back to Dashboard button */}
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold"
      >
        ← Back to Dashboard
      </button>

      {/* Header and New Product button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-[var(--font-heading)]">Manage Products</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="px-6 py-3 bg-[var(--accent-color)] text-white rounded hover:bg-green-700 transition font-bold"
        >
          + New Product
        </button>
      </div>

      {/* Product table or empty message */}
      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-[var(--secondary-bg-color)] text-[var(--text-color)] text-left">
                <th className="border p-4">Title</th>
                <th className="border p-4">Artist</th>
                <th className="border p-4">Genre</th>
                <th className="border p-4">Price</th>
                <th className="border p-4">Stock</th>
                <th className="border p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`text-[var(--text-color)] ${
                    index % 2 === 0 ? "bg-[var(--bg-color)]" : "bg-[var(--secondary-bg-color)]"
                  }`}
                >
                  <td className="border p-4">{product.title}</td>
                  <td className="border p-4">{product.artist}</td>
                  <td className="border p-4">{product.genre}</td>
                  <td className="border p-4">${product.price}</td>
                  <td className="border p-4">{product.stock}</td>
                  <td className="border p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-[var(--secondary-accent)] text-white rounded hover:bg-red-700 transition font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-xl font-semibold text-[var(--secondary-accent)]">No products available.</p>
      )}
    </div>
  );
};

export default ManageProducts;