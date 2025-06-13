import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ Ensure admin-only access
import useTheme from "../hooks/useTheme";

const NewProduct = () => {
  useAuth(); // ✅ Protects this admin page from unauthorized users
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseYear: "",
    label: "",
    condition: "",
    price: "",
    stock: "",
    imageUrl: "",
    trackListing: [{ trackNumber: 1, title: "", duration: "" }],
  });

  // ✅ Handle input changes for product fields & track listing
  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedTracks = [...formData.trackListing];
      updatedTracks[index][field] = value;
      setFormData({ ...formData, trackListing: updatedTracks });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      {/* Back to Products button */}
      <button onClick={() => navigate("/admin/products")} className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold">
        ← Back to Products
      </button>

      <h1 className="text-4xl font-[var(--font-heading)] text-center mb-6">New Product</h1>

      {/* Product creation form */}
      <form className="max-w-2xl mx-auto bg-[var(--bg-color)] p-6 rounded-lg shadow-lg space-y-4">
        {/* Render input fields for product details */}
        {["title", "artist", "genre", "releaseYear", "label", "condition", "price", "stock", "imageUrl"].map((name) => (
          <input key={name} name={name} placeholder={name} value={formData[name]} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300" />
        ))}
      </form>
    </div>
  );
};

export default NewProduct;