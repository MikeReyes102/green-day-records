import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useTheme from "./hooks/useTheme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      {/* Main Wrapper */}
      <div className="relative min-h-screen">
        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />
          <Route path="/dashboard" element={<Dashboard theme={theme} />} />
          <Route path="/product" element={<ProductPage theme={theme} />} />
          <Route
            path="/account"
            element={<AccountPage toggleTheme={toggleTheme} theme={theme} />}
          />
          <Route path="/cart" element={<CartPage theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
