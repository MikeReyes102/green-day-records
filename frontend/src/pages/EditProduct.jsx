import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

// EditProduct component allows admin to edit an existing product (record)
const EditProduct = () => {
  const { productId } = useParams(); // Get product ID from URL
  const { theme } = useTheme(); // Get current theme
  const navigate = useNavigate(); // For navigation
  const token = localStorage.getItem("token"); // Get auth token

  const [formData, setFormData] = useState(null); // State for form data

  // Fetch product data on mount
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
  }, [productId, navigate]);

  // Handle input changes for both main fields and track listing
  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // Update a specific track in the track listing
      const updatedTracks = [...formData.trackListing];
      updatedTracks[index][field] = value;
      setFormData({ ...formData, trackListing: updatedTracks });
    } else {
      // Update main product fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add a new empty track to the track listing
  const addTrack = () => {
    setFormData((prev) => ({
      ...prev,
      trackListing: [
        ...prev.trackListing,
        { trackNumber: prev.trackListing.length + 1, title: "", duration: "" },
      ],
    }));
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

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

  // Show loading state if product data is not loaded yet
  if (!formData)
    return <p className="text-center text-lg">Loading product...</p>;

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      {/* Back button */}
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold"
      >
        ← Back to Products
      </button>

      <h1 className="text-4xl font-[var(--font-heading)] text-center mb-6">
        Edit Product
      </h1>

      {/* Product edit form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[var(--bg-color)] p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Main product fields */}
        {[
          { name: "title", label: "Title" },
          { name: "artist", label: "Artist" },
          { name: "genre", label: "Genre" },
          { name: "releaseYear", label: "Release Year", type: "number" },
          { name: "label", label: "Label" },
          { name: "condition", label: "Condition" },
          { name: "price", label: "Price", type: "number" },
          { name: "stock", label: "Stock", type: "number" },
          { name: "imageUrl", label: "Image URL" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="space-y-2">
            <label
              htmlFor={name}
              className="block font-bold text-[var(--text-color)]"
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300"
            />
          </div>
        ))}

        {/* Track listing section */}
        <div>
          <label className="block font-bold mb-2 text-[var(--text-color)]">
            Track Listing:
          </label>
          {formData.trackListing.map((track, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <div>
                <label
                  htmlFor={`trackNumber-${index}`}
                  className="block font-bold text-[var(--text-color)]"
                >
                  Track #
                </label>
                <input
                  id={`trackNumber-${index}`}
                  type="number"
                  value={track.trackNumber}
                  min={1}
                  onChange={(e) => handleChange(e, index, "trackNumber")}
                  className="px-3 py-2 border rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor={`title-${index}`}
                  className="block font-bold text-[var(--text-color)]"
                >
                  Title
                </label>
                <input
                  id={`title-${index}`}
                  type="text"
                  value={track.title}
                  onChange={(e) => handleChange(e, index, "title")}
                  className="px-3 py-2 border rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor={`duration-${index}`}
                  className="block font-bold text-[var(--text-color)]"
                >
                  Duration
                </label>
                <input
                  id={`duration-${index}`}
                  type="text"
                  value={track.duration}
                  onChange={(e) => handleChange(e, index, "duration")}
                  className="px-3 py-2 border rounded w-full"
                />
              </div>
            </div>
          ))}

          {/* Button to add a new track */}
          <button
            type="button"
            onClick={addTrack}
            className="mt-2 text-sm font-bold text-[var(--accent-color)] hover:underline"
          >
            + Add Track
          </button>
        </div>

        {/* Submit button */}
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
