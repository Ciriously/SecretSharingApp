// Navigation.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import Secrets from "./Pages/Secrets";

const Navigation = () => {
  return (
    <Router>
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
