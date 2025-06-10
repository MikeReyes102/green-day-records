import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  function removeFromCart(productId) {
    const updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-background text-text" : "bg-background text-text"}`}>
      <div className="w-full max-w-lg p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>

        <div className="mt-4">
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="mb-4 flex justify-between">
                <div>
                  <p className="text-lg font-semibold">{item.title} - {item.artist}</p>
                  <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500">Remove</button>
              </div>
            ))
          )}
        </div>

        <h2 className="text-xl font-semibold mt-4 text-center">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button className="w-full px-4 py-2 primary-btn rounded-md transition">
            Checkout
          </button>
          <button onClick={() => navigate("/dashboard")} className="w-full px-4 py-2 secondary-btn rounded-md transition">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;