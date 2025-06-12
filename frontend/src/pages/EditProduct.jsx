import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const EditProduct = () => {
  const { productId } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await api.getProductById(productId);
      if (product) {
        setFormData(product);
      } else {
        console.error("❌ Product not found");
        navigate("/admin/products");
      }
    };

    fetchProduct();
  }, [productId]);

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

  const addTrack = () => {
    setFormData((prev) => ({
      ...prev,
      trackListing: [
        ...prev.trackListing,
        { trackNumber: prev.trackListing.length + 1, title: "", duration: "" }
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Product updated:", data);
        navigate("/admin/products");
      } else {
        const error = await response.json();
        console.error("❌ Update failed:", error.message);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  if (!formData) return <p className="text-center text-lg">Loading product...</p>;

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold"
      >
        ← Back to Products
      </button>

      <h1 className="text-4xl font-[var(--font-heading)] text-center mb-6">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[var(--bg-color)] p-6 rounded-lg shadow-lg space-y-4"
      >
        {[
          { name: "title", label: "Title" },
          { name: "artist", label: "Artist" },
          { name: "genre", label: "Genre" },
          { name: "releaseYear", label: "Release Year", type: "number" },
          { name: "label", label: "Label" },
          { name: "condition", label: "Condition" },
          { name: "price", label: "Price", type: "number" },
          { name: "stock", label: "Stock", type: "number" },
          { name: "imageUrl", label: "Image URL" }
        ].map(({ name, label, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={label}
            value={formData[name]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        ))}

        <div>
          <label className="block font-bold mb-2">Track Listing:</label>
          {formData.trackListing.map((track, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input
                type="number"
                value={track.trackNumber}
                min={1}
                onChange={(e) => handleChange(e, index, "trackNumber")}
                placeholder="Track #"
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={track.title}
                onChange={(e) => handleChange(e, index, "title")}
                placeholder="Title"
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={track.duration}
                onChange={(e) => handleChange(e, index, "duration")}
                placeholder="Duration"
                className="px-3 py-2 border rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTrack}
            className="mt-2 text-sm font-bold text-[var(--accent-color)] hover:underline"
          >
            + Add Track
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[var(--accent-color)] text-white rounded hover:bg-green-700 transition font-bold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;