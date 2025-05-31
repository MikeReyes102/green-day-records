import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();

  const mockUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    joined: "March 2023",
    orders: [
      { id: 1, title: "Abbey Road", status: "Shipped" },
      { id: 2, title: "Dark Side of the Moon", status: "Processing" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">Account Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg mt-4 w-80 text-left">
        <p className="text-lg font-semibold">Name: {mockUser.name}</p>
        <p className="text-sm">Email: {mockUser.email}</p>
        <p className="text-sm">Joined: {mockUser.joined}</p>
      </div>

      {/* Order History */}
      <div className="mt-6 w-80">
        <h2 className="text-lg font-semibold">Order History</h2>
        <ul className="list-disc list-inside text-gray-300">
          {mockUser.orders.map((order) => (
            <li key={order.id}>{order.title} - {order.status}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition">
          Edit Account
        </button>
        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md transition">
          Change Password
        </button>
        <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AccountPage;