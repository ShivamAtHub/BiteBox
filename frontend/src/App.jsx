// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Dashboard from "./pages/CustomerDashboard";
import { FeaturesSectionDemo } from "./pages/CustomerFeature";

import Menu from "./pages/Menu";
// import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer-dashboard" element={<Dashboard />} />
            <Route path="/features" element={<FeaturesSectionDemo />} />

            <Route path="/menu" element={<Menu />} />
            {/* <Route path ="/contact" element={<ContactUs />} /> */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;
