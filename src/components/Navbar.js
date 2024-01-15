import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to the homepage after logout
    navigate("/");
    onLogout(); // Call the provided onLogout function
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-slate text-2xl font-inter font-bold">HushHub</h1>
        {isAuthenticated ? (
          <div className="flex items-center">
            <p className="font-mono mr-6">Welcome, {user.email}!</p>
            <button
              className="bg-white text-black font-inter font-bold py-2 px-4 rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <button className="text-slate mr-4">Signup</button>
            <button className="text-slate">Login</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
