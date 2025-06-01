import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const ProductPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <div className="w-full max-w-md p-6 rounded-lg container">
        <img src="https://via.placeholder.com/150" alt="Mock Album" className="w-64 h-64 rounded-md object-cover mb-4" />
        
        <h1 className="text-3xl font-bold text-center">Mock Album Title</h1>
        <h2 className="text-lg text-gray-400 text-center">Mock Artist Name</h2>
        
        {/* Album Details */}
        <div className="text-center">
          <p className="text-sm mt-2">Genre: Rock</p>
          <p className="text-sm">Release Year: 2000</p>
          <p className="text-sm">Label: Example Records</p>
          <p className="text-sm">Condition: New</p>
          <p className="text-sm font-semibold mt-2">Price: $19.99</p>
          <p className="text-green-500 text-sm">In Stock: 10</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button className="w-full sm:w-auto px-4 py-2 primary-btn rounded-md transition">
            Add to Cart
          </button>
          <button onClick={() => navigate("/dashboard")} className="w-full sm:w-auto px-4 py-2 secondary-btn rounded-md transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
