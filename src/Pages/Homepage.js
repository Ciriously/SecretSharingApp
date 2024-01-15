import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Secrets from "./Secrets";
import SecretsGuardedCounter from "../components/counter";

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="font-mono h-screen bg-black text-white flex-col items-center">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex flex-col items-center justify-center h-full">
        {/* Title Screen */}
        <div className="flex items-center mt-2">
          <div className="text-8xl font-Inter font-extrabold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
            Secret Sharing
          </div>
          <img src="heart.gif" alt="Heart Gif" className="ml-2 h-16 w-19" />
        </div>

        {/* Information */}
        {isAuthenticated ? (
          <div className="flex flex-col items-center">
            {/* Description in an invisible-bordered rectangle */}
            <div className="border border-transparent p-4 rounded-md mt-4 max-w-6xl text-center">
              <p className="text-2xl font-mono text-slate-400 font-bold">
                Remember when your mom told you to never tell anyone your
                secrets? Well, guess what? She was wrong! At least when it comes
                to HushHub. Share your deepest desires, wildest dreams, and most
                embarrassing childhood memories with complete strangers, and
                then watch them poof into oblivion like a magician's
                disappearing rabbit. It's like telling your mom everything, but
                without the guilt trip and unsolicited life advice. Just
                remember, don't tell her you heard it from me.
              </p>
            </div>

            <Link
              to="Secrets"
              className="text-4xl text-blue-500 mt-4 transition-all duration-300 transform hover:translate-x-2"
            >
              Explore Secrets <span className="ml-2">&#8594;</span>
            </Link>
          </div>
        ) : (
          <p className="text-lg">
            Log in to start sharing your secrets securely.
          </p>
        )}
      </div>
      <SecretsGuardedCounter className="mt-6" />
    </div>
  );
};

export default HomePage;
