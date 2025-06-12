import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

// Component for creating a new product
const NewProduct = () => {
  const { theme } = useTheme(); // Theme hook for styling
  const navigate = useNavigate(); // Navigation hook
  const token = localStorage.getItem("token"); // Get auth token

  // State for form data, including track listing
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
    trackListing: [
      { trackNumber: 1, title: "", duration: "" }
    ]
  });

  // Handle input changes for both product fields and track listing
  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // Update a specific track in the track listing
      const updatedTracks = [...formData.trackListing];
      updatedTracks[index][field] = value;
      setFormData({ ...formData, trackListing: updatedTracks });
    } else {
      // Update a regular product field
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add a new track to the track listing
  const addTrack = () => {
    setFormData((prev) => ({
      ...prev,
      trackListing: [
        ...prev.trackListing,
        { trackNumber: prev.trackListing.length + 1, title: "", duration: "" }
      ]
    }));
  };

  // Handle form submission to create a new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Product created:", data);
        navigate("/admin/products"); // Redirect to products page
      } else {
        const error = await response.json();
        console.error("❌ Error:", error.message);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
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

      {/* Page header */}
      <h1 className="text-4xl font-[var(--font-heading)] text-center mb-6">
        New Product
      </h1>

      {/* Product creation form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[var(--bg-color)] p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Render input fields for product details */}
        {[
          {
            name: "title",
            label: "Title"
          },
          {
            name: "artist",
            label: "Artist"
          },
          {
            name: "genre",
            label: "Genre"
          },
          {
            name: "releaseYear",
            label: "Release Year",
            type: "number"
          },
          {
            name: "label",
            label: "Label"
          },
          {
            name: "condition",
            label: "Condition"
          },
          {
            name: "price",
            label: "Price",
            type: "number"
          },
          {
            name: "stock",
            label: "Stock",
            type: "number"
          },
          {
            name: "imageUrl",
            label: "Image URL"
          }
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

        {/* Track listing section */}
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
          Create Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;