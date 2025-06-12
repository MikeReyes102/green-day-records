import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

// ProductGrid component displays a grid of product cards.
// It shows either search results or all products if no search is active.
const ProductGrid = ({ searchResults }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products if there are no search results
  useEffect(() => {
    if (!searchResults) {
      const fetchProducts = async () => {
        const data = await api.getProducts();
        setProducts(data);
      };

      fetchProducts();
    }
  }, [searchResults]);

  // Determine which products to display: search results or all products
  const displayedProducts = searchResults?.length > 0 ? searchResults : products;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => (
          <div
            key={product._id}
            // Navigate to product detail page on click, passing productId in state
            onClick={() => navigate("/product", { state: { productId: product._id } })}
            className="card rounded-lg flex flex-col items-center w-58 h-80 cursor-pointer hover:bg-gray-700 transition"
          >
            {/* Product image */}
            <img src={product.imageUrl} alt={product.artist} className="w-48 h-48 rounded-md object-cover" />
            {/* Product title */}
            <h3 className="text-md mt-2">{product.title}</h3>
            {/* Product artist */}
            <p className="text-sm">{product.artist}</p>
            {/* Product price */}
            <p className="text-sm mt-2">${product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        // Show message if no products found
        <p className="text-lg text-center">No products found.</p>
      )}
    </div>
  );
};

export default ProductGrid;