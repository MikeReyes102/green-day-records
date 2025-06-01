import { useNavigate } from "react-router-dom";

const AccountPage = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();

  const mockUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    joined: "March 2023",
    orders: [
      { id: 1, title: "Abbey Road", status: "Shipped" },
      { id: 2, title: "Dark Side of the Moon", status: "Processing" },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-text p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 rounded-lg container">
        <h1 className="text-3xl font-bold text-center">Account Settings</h1>

        {/* Account Details */}
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Name: {mockUser.name}</p>
          <p className="text-sm">Email: {mockUser.email}</p>
          <p className="text-sm">Joined: {mockUser.joined}</p>
        </div>

        {/* Order History */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Order History</h2>
          <ul className="list-disc list-inside text-text">
            {mockUser.orders.map((order) => (
              <li key={order.id}>{order.title} - {order.status}</li>
            ))}
          </ul>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 primary-btn rounded-md transition"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <button className="w-full sm:w-auto px-4 py-2 primary-btn rounded-md transition">
            Edit Account
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-4 py-2 secondary-btn rounded-md transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;