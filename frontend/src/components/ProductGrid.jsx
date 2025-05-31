import { Link } from "react-router-dom";
import records from "../../../data/records.json";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
      {records.map((_, index) => (
        <Link key={index} to="/product">
          <div className="bg-gray-800 p-4 rounded-lg text-white flex flex-col items-center w-58 h-72 cursor-pointer hover:bg-gray-700 transition">
            <img src="https://via.placeholder.com/150" alt="Album Cover" className="w-48 h-48 rounded-md object-cover" />
            <h3 className="text-lg font-semibold mt-2">Artist Name</h3>
            <p className="text-sm">Album Title</p>
          </div>
        </Link>
      ))}
    </div>
  );
};


export default ProductGrid;

