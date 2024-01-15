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
    <div className="font-mono h-screen bg-black text-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      <div className="absolute top-10 left-10 m-8 flex flex-col">
        {/* Title Screen with Gradient Text and Heart Gif */}
        <div className="flex items-center">
          <div className="text-8xl font-Inter font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
            Secret Sharing
          </div>
          <img src="heart.gif" alt="Heart Gif" className="ml-2 h-16" />
        </div>

        {/* Information */}
        {isAuthenticated ? (
          <div>
            <p className="text-lg mt-4 font-inter font-semibold">
              Welcome, {user.name}! You can start sharing your secrets securely.
            </p>
            {/* Description */}
            <p className="text-4xl mt-7 font-inter text-slate-400 font-bold">
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
