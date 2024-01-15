import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-slate text-2xl font-inter font-bold">
          Secret Sharing
        </h1>
        {isAuthenticated ? (
          <div className="flex items-center">
            <p className="text-slate mr-4">Welcome, {user.email}!</p>
            <button
              className="bg-white text-black font-bold py-2 px-4 rounded-full"
              onClick={() => onLogout()}
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
