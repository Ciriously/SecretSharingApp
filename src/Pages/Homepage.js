import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar"; // Update the path based on your project structure

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <div className="font-inter">
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />

      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Secret Sharing</h1>

          {isAuthenticated ? (
            <div>
              <p className="text-lg">
                Welcome, {user.email}! You can start sharing your secrets
                securely.
              </p>
            </div>
          ) : (
            <p className="text-lg">
              Log in to start sharing your secrets securely.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
