import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ Ensure admin-only access
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

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

  // ✅ Add a new track to the listing
  const addTrack = () => {
    setFormData({
      ...formData,
      trackListing: [
        ...formData.trackListing,
        { trackNumber: formData.trackListing.length + 1, title: "", duration: "" },
      ],
    });
  };

  // ✅ Remove a track from the listing
  const removeTrack = (index) => {
    setFormData({
      ...formData,
      trackListing: formData.trackListing.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await api.createProduct(formData); // ✅ Send product data to backend

      if (result.error) {
        console.error("❌ Error creating product:", result.error);
      } else {
        console.log("✅ Product created successfully:", result);
        navigate("/admin/products"); // ✅ Redirect after successful creation
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      {/* Back to Products button */}
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold"
      >
        ← Back to Products
      </button>

      <h1 className="text-4xl font-[var(--font-heading)] text-center mb-6">
        New Product
      </h1>

      {/* Product creation form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[var(--bg-color)] p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Input fields */}
        {[
          "title",
          "artist",
          "genre",
          "releaseYear",
          "label",
          "condition",
          "price",
          "stock",
          "imageUrl",
        ].map((name) => (
          <input
            key={name}
            name={name}
            placeholder={name}
            value={formData[name]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        ))}

        {/* Track Listing Section */}
        <h2 className="text-xl font-bold">Track Listing</h2>
        {formData.trackListing.map((track, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={`Track ${track.trackNumber} Title`}
              value={track.title}
              onChange={(e) => handleChange(e, index, "title")}
              required
              className="w-1/2 px-4 py-2 rounded border border-gray-300"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 3:45)"
              value={track.duration}
              onChange={(e) => handleChange(e, index, "duration")}
              required
              className="w-1/4 px-4 py-2 rounded border border-gray-300"
            />
            <button
              type="button"
              onClick={() => removeTrack(index)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
            >
              ❌ Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addTrack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          ➕ Add Track
        </button>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[var(--accent-color)] text-white rounded hover:bg-green-700 transition font-bold"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;