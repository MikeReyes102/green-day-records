import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const mockCart = [
    { id: 1, title: "Abbey Road", artist: "The Beatles", price: 34.99, quantity: 1 },
    { id: 2, title: "Dark Side of the Moon", artist: "Pink Floyd", price: 29.99, quantity: 2 }
  ];

  const totalPrice = mockCart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="bg-gray-800 p-6 rounded-lg mt-4 w-80 text-left">
        {mockCart.map((item) => (
          <div key={item.id} className="mb-4">
            <p className="text-lg font-semibold">{item.title} - {item.artist}</p>
            <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
            <p className="text-sm">Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <h2 className="text-xl font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</h2>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition">
          Checkout
        </button>
        <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CartPage;