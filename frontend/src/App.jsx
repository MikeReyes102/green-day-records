import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import useTheme from "./hooks/useTheme";

// Importing all page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ManageOrders from "./pages/ManageOrders";
import ManageProducts from "./pages/ManageProducts"; // Admin: Manage products
import NewProduct from "./pages/NewProduct";         // Admin: Add new product
import EditProduct from "./pages/EditProduct";       // Admin: Edit product

import ProductPage from "./pages/ProductPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";

const App = () => {
  // Custom hook for theme (dark/light mode)
  const { theme, toggleTheme } = useTheme();
  // Get user role from localStorage to determine access
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      {/* Main app container with dynamic theme classes */}
      <div className={`relative min-h-screen ${theme === "dark" ? "bg-background text-text" : "bg-light text-dark"}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />

          {/* User Dashboard (redirects admin to admin dashboard) */}
          <Route
            path="/dashboard"
            element={
              userRole === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Dashboard theme={theme} />
              )
            }
          />

          {/* Admin Routes (protected, only accessible by admin) */}
          <Route
            path="/admin"
            element={
              userRole === "admin" ? (
                <AdminDashboard theme={theme} toggleTheme={toggleTheme} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              userRole === "admin" ? (
                <UserManagement theme={theme} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              userRole === "admin" ? (
                <ManageOrders theme={theme} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/products"
            element={
              userRole === "admin" ? (
                <ManageProducts theme={theme} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/products/new"
            element={
              userRole === "admin" ? (
                <NewProduct theme={theme} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/products/:productId/edit"
            element={
              userRole === "admin" ? (
                <EditProduct theme={theme} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* Public Product and Account Pages */}
          <Route path="/product" element={<ProductPage theme={theme} />} />
          <Route path="/account" element={<AccountPage toggleTheme={toggleTheme} theme={theme} />} />
          <Route path="/cart" element={<CartPage theme={theme} />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;