import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Dashboard from "./pages/CustomerDashboard";
import { FeaturesSectionDemo } from "./pages/CustomerFeature";
import Menu from "./pages/Menu";
import CartPage from "./pages/CartPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import CustomerOrdersPage from "./pages/CustomerOrdersPage";
import { CartProvider } from "./context/CartContext";
import RoundRobinTest from './components/RoundRobinTest';


function App() {
  // Initialize theme on app load
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");

    // Check system preference if no saved theme
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set dark mode based on saved preference or system preference
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      // Only change if user hasn't set a preference
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer-dashboard" element={<Dashboard />} />
            <Route path="/features" element={<FeaturesSectionDemo />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />
            <Route path="/customer-orders" element={<CustomerOrdersPage />} />
            <Route path="/round-robin-test" element={<RoundRobinTest />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;