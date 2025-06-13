import { useState, useEffect } from "react";

/**
 * Custom hook for managing shopping cart state
 * - Loads cart from localStorage
 * - Removes items from cart
 * - Tracks total price dynamically
 * @returns {Object} cart management functions and state
 */
const useCart = () => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  // ✅ Remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // ✅ Calculate total price dynamically
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return { cart, removeFromCart, totalPrice };
};

export default useCart;