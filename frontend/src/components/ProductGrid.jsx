import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await api.getProducts();
      setProducts(data); // Store fetched products in state
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <div className="card rounded-lg flex flex-col items-center w-58 h-72 cursor-pointer hover:bg-gray-700 transition">
              <img src={product.imageUrl} alt={product.title} className="w-48 h-48 rounded-md object-cover" />
              <h3 className="text-lg font-semibold mt-2">{product.artist}</h3>
              <p className="text-sm">{product.title}</p>
              <p className="text-md font-semibold mt-2">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-lg text-center">No products found.</p>
      )}
    </div>
  );
};

export default ProductGrid;