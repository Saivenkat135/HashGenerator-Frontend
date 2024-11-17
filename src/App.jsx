import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GuestDashboard from "./components/GuestDashboard.jsx";
import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SavedUserData from "./components/SavedUserData.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/dashboard/:email" element={<Dashboard />} />
        <Route path="/saved-user-data/:email" element={<SavedUserData />} />
      </Routes>
    </Router>
  );
}

export default App;
