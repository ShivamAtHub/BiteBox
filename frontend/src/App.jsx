// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <div> 
        {/* className="min-h-screen bg-black text-white" */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path ="/register" element={<Register />} />
          <Route path ="/contact" element={<ContactUs />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
