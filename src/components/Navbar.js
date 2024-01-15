import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Secret Sharing</h1>
        {isAuthenticated && (
          <div className="flex items-center">
            <p className="text-white mr-4">{user.email}</p>
            <button
              className="bg-white text-black font-bold py-2 px-4 rounded-full"
              onClick={() => onLogout()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
