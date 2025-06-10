import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const ProductPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state?.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  function addToCart() {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, product]));

    console.log("✅ Item added to cart:", product); // Debugging

    navigate("/cart"); // ✅ Redirects user to Cart Page after adding
  }

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <div className="w-full max-w-md p-6 rounded-lg container">
        <img src={product.imageUrl} alt={product.title} className="w-64 h-64 rounded-md object-cover mb-4" />
        <h1 className="text-3xl font-bold text-center">{product.title}</h1>
        <h2 className="text-lg text-gray-400 text-center">{product.artist}</h2>

        <div className="text-center">
          <p className="text-sm mt-2">Genre: {product.genre}</p>
          <p className="text-sm">Release Year: {product.releaseYear}</p>
          <p className="text-sm">Label: {product.label}</p>
          <p className="text-sm">Condition: {product.condition}</p>
          <p className="text-sm font-semibold mt-2">Price: ${product.price.toFixed(2)}</p>
          <p className={`text-sm ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button onClick={addToCart} className="w-full px-4 py-2 primary-btn rounded-md transition">
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