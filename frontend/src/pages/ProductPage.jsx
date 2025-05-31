import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <img src="https://via.placeholder.com/150" alt="Mock Album" className="w-64 h-64 rounded-md object-cover mb-4" />
      
      <h1 className="text-3xl font-bold">Mock Album Title</h1>
      <h2 className="text-lg text-gray-400">Mock Artist Name</h2>
      <p className="text-sm mt-2">Genre: Rock</p>
      <p className="text-sm">Release Year: 2000</p>
      <p className="text-sm">Label: Example Records</p>
      <p className="text-sm">Condition: New</p>
      <p className="text-sm font-semibold mt-2">Price: $19.99</p>
      <p className="text-green-500 text-sm">In Stock: 10</p>

      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition">
          Add to Cart
        </button>
        <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductPage;