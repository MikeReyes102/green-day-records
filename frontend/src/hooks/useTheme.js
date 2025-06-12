import { useState, useEffect } from "react";

// Custom hook for managing light/dark theme
const useTheme = () => {
  // Initialize theme from localStorage or default to "dark"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Toggle between "dark" and "light" themes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Update the document's class list when theme changes
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Return current theme and toggle function
  return { theme, toggleTheme };
};

export default useTheme;