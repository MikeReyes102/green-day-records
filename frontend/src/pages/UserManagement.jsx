import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("❌ Failed to fetch users:", await response.json());
        }
      } catch (error) {
        console.error("❌ Network Error:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const profile = await api.getUserProfile(token);
        if (profile && profile._id) {
          setCurrentUserId(profile._id);
        }
      } catch (error) {
        console.error("❌ Failed to fetch current user profile:", error);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []); // <-- leave the array empty now

  const deleteUser = async (userId) => {
    const result = await api.deleteUser(userId, token);
    if (!result.error) {
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } else {
      console.error(result.error);
    }
  };

  const updateUserRole = async (userId, role) => {
    const result = await api.updateUserRole(userId, role, token);
    if (!result.error) {
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, role } : user))
      );
    } else {
      console.error(result.error);
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

      <h1 className="text-4xl font-[var(--font-heading)] text-center">
        Manage Users
      </h1>
      <p className="text-lg text-center text-[var(--secondary-accent)] mb-6">
        Edit roles or remove users
      </p>

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
                        index % 2 === 0
                          ? "bg-[var(--bg-color)]"
                          : "bg-[var(--secondary-bg-color)]"
                      }`}
                    >
                      <td className="border p-4">{user.name}</td>
                      <td className="border p-4">{user.email}</td>
                      <td className="border p-4">{user.role}</td>
                      <td className="border p-4 flex gap-2">
                        <button
                          onClick={() => deleteUser(user._id)}
                          disabled={isCurrentUser}
                          className={`px-3 py-1 rounded transition font-bold ${
                            isCurrentUser
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-[var(--secondary-accent)] text-white hover:bg-red-700"
                          }`}
                          title={
                            isCurrentUser
                              ? "You can't delete yourself"
                              : "Delete this user"
                          }
                        >
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            updateUserRole(
                              user._id,
                              user.role === "admin" ? "user" : "admin"
                            )
                          }
                          disabled={isCurrentUser}
                          className={`px-3 py-1 rounded transition font-bold ${
                            isCurrentUser
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-[var(--accent-color)] text-white hover:bg-blue-700"
                          }`}
                          title={
                            isCurrentUser
                              ? "You can't change your own role"
                              : user.role === "admin"
                              ? "Revoke Admin"
                              : "Make Admin"
                          }
                        >
                          {user.role === "admin"
                            ? "Revoke Admin"
                            : "Make Admin"}
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
