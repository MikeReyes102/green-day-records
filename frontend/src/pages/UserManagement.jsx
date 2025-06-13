import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ Ensure admin-only access
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const UserManagement = () => {
  useAuth(); // ✅ Protects this admin page from unauthorized users
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // ✅ UI-based error handling

  // ✅ Fetch users & current user profile on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        setErrorMessage("Failed to load users. Please try again.");
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const profile = await api.getUserProfile();
        if (profile?._id) {
          setCurrentUserId(profile._id);
        }
      } catch (error) {
        console.error("❌ Error fetching current user profile:", error);
        setErrorMessage("Failed to load user data.");
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  // ✅ Handle user deletion
  const deleteUser = async (userId) => {
    try {
      await api.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      setErrorMessage("Failed to delete user. Please try again.");
    }
  };

  // ✅ Handle user role update
  const updateUserRole = async (userId, role) => {
    try {
      await api.updateUserRole(userId, role);
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, role } : user))
      );
    } catch (error) {
      console.error("❌ Error updating user role:", error);
      setErrorMessage("Failed to update user role. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen ${theme} p-6 font-[var(--font-body)]`}>
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 px-6 py-3 bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded hover:bg-gray-700 transition font-bold"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-[var(--font-heading)] text-center">Manage Users</h1>
      <p className="text-lg text-center text-[var(--secondary-accent)] mb-6">
        Edit roles or remove users
      </p>

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="mt-4">
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-[var(--secondary-bg-color)] text-[var(--text-color)] text-left">
                  <th className="border p-4">Name</th>
                  <th className="border p-4">Email</th>
                  <th className="border p-4">Role</th>
                  <th className="border p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const isCurrentUser = user._id === currentUserId;

                  return (
                    <tr
                      key={user._id}
                      className={`text-[var(--text-color)] ${
                        index % 2 === 0 ? "bg-[var(--bg-color)]" : "bg-[var(--secondary-bg-color)]"
                      }`}
                    >
                      <td className="border p-4">{user.name}</td>
                      <td className="border p-4">{user.email}</td>
                      <td className="border p-4">{user.role}</td>
                      <td className="border p-4 flex gap-2">
                        {/* Delete button, disabled for self */}
                        <button
                          onClick={() => deleteUser(user._id)}
                          disabled={isCurrentUser}
                          className={`px-3 py-1 rounded transition font-bold ${
                            isCurrentUser
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-[var(--secondary-accent)] text-white hover:bg-red-700"
                          }`}
                          title={isCurrentUser ? "You can't delete yourself" : "Delete this user"}
                        >
                          Delete
                        </button>

                        {/* Role toggle button, disabled for self */}
                        <button
                          onClick={() => updateUserRole(user._id, user.role === "admin" ? "user" : "admin")}
                          disabled={isCurrentUser}
                          className={`px-3 py-1 rounded transition font-bold ${
                            isCurrentUser
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-[var(--accent-color)] text-white hover:bg-blue-700"
                          }`}
                          title={isCurrentUser ? "You can't change your own role" : user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                        >
                          {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-6 text-xl font-semibold text-[var(--secondary-accent)]">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;