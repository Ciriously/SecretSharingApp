import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Secrets from "./Secrets";

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    // Call the logout function to log the user out
    logout();
  };

  return (
    <div className="font-mono h-screen bg-black text-white  flex-col items-center">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex flex-col items-center justify-center h-full">
        {/* Title Screen with Gradient Text and Heart Gif */}
        <div className="flex items-center mt-2">
          <div className="text-8xl font-Inter font-extrabold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
            Secret Sharing
          </div>
          <img src="heart.gif" alt="Heart Gif" className="ml-2 h-16" />
        </div>

        {/* Information */}
        {isAuthenticated ? (
          <div className="flex flex-col items-center">
            {/* Description */}
            <p className="text-4xl font-inter text-slate-400 font-bold mt-4 text-center">
              Share your thoughts, feelings, and secrets with the world while
              keeping your identity secure.
            </p>
            {/* Arrow Link to Secrets Component */}
            <a href="/secrets" className="text-4xl text-blue-500 mt-4">
              Explore Secrets <span className="ml-2">&#8594;</span>
            </a>
          </div>
        ) : (
          <p className="text-lg">
            Log in to start sharing your secrets securely.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
