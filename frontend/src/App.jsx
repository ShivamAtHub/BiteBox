import { Routes, Route } from "react-router-dom";
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
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
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
