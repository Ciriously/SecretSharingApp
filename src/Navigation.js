// Navigation.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import Secrets from "./Pages/Secrets";

const Navigation = () => {
  return (
    <Router>
      <nav>
        <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
          <li style={{ marginRight: "10px" }}>
            <Link to="/home">Home</Link>
          </li>
          <li style={{ marginRight: "10px" }}>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/secrets">Secrets</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/secrets" element={<Secrets />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
