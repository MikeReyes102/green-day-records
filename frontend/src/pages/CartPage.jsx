import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";

const CartPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const mockCart = [
    {
      id: 1,
      title: "Abbey Road",
      artist: "The Beatles",
      price: 34.99,
      quantity: 1,
    },
    {
      id: 2,
      title: "Dark Side of the Moon",
      artist: "Pink Floyd",
      price: 29.99,
      quantity: 2,
    },
  ];

  const totalPrice = mockCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-background text-text" : "bg-background text-text"
      }`}
    >
      <div className="w-full max-w-lg p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="mt-4">
          {mockCart.map((item) => (
            <div key={item.id} className="mb-4">
              <p className="text-lg font-semibold">
                {item.title} - {item.artist}
              </p>
              <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <h2 className="text-xl font-semibold mt-4 text-center">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button className="w-full px-4 py-2 primary-btn rounded-md transition">
            Checkout
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full px-4 py-2 secondary-btn rounded-md transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
