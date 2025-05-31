import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 w-full rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 w-full rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 w-full rounded bg-gray-800 border border-gray-700"
        />
        <button className="px-4 py-2 w-full bg-green-600 hover:bg-green-700 rounded-md transition">
          Register
        </button>
      </form>

      {/* Cancel Button */}
      <div className="flex flex-col gap-4 items-center w-80">
        <Link to="/" className="w-full">
          <button className="mt-4 px-4 py-2 w-full bg-red-600 hover:bg-red-700 rounded-md transition">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
