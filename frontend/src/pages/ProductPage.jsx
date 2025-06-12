import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

// ProductPage component displays details for a single product
const ProductPage = () => {
  const { theme } = useTheme(); // Get current theme for styling
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Location hook to access route state
  const productId = location.state?.productId; // Get productId from route state
  const [product, setProduct] = useState(null); // State for product data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch product details when component mounts or productId changes
  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(productId); // Fetch product from API
        setProduct(data);
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Add product to cart and redirect to cart page
  function addToCart() {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, product]));

    console.log("✅ Item added to cart:", product); // Debugging

    navigate("/cart"); // Redirect to Cart Page after adding
  }

  // Show loading or error states
  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  // Render product details
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-background text-text" : "bg-background text-text"
      }`}
    >
      <div className="w-full max-w-md p-6 rounded-lg container">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-64 h-64 rounded-md object-cover mb-4 mx-auto flex justify-center"
        />
        <h1 className="text-3xl font-bold text-center">{product.title}</h1>
        <h2 className="text-lg text-gray-400 text-center">{product.artist}</h2>

        <div className="text-center">
          <p className="text-sm mt-2">Genre: {product.genre}</p>
          <p className="text-sm">Release Year: {product.releaseYear}</p>
          <p className="text-sm">Label: {product.label}</p>
          <p className="text-sm">Condition: {product.condition}</p>
          <p className="text-sm font-semibold mt-2">
            Price: ${product.price.toFixed(2)}
          </p>
          <p
            className={`text-sm ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button
            onClick={addToCart}
            className="w-full px-4 py-2 primary-btn rounded-md transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-4 py-2 secondary-btn rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
