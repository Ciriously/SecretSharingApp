import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const [secretsGuarded, setSecretsGuarded] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecretsGuarded((prevCount) => prevCount + 3);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="font-mono bg-black text-white min-h-screen flex-col items-center">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      {/* SecretsGuardedCounter Component */}
      <div className="bg-gray-700 p-2 rounded-md justify-center w-full max-w-screen-md m-auto flex items-center h-16 text-center mt-8 md:mt-16 mb-8 md:mb-24">
        <h2 className="text-white text-lg md:text-2xl font-mono font-semibold mr-2">
          Secrets Safeguarded So Far
        </h2>
        <p className="text-sky-500 text-lg md:text-2xl font-bold">
          :{secretsGuarded}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Title Screen */}
        <div className="flex flex-col items-center mt-8 md:mt-14">
          <div className="text-4xl md:text-8xl font-inter font-extrabold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
            Secret Sharing
          </div>
          <img
            src="logo.gif"
            alt="logo Gif"
            className="mt-4 md:mt-6 h-24 md:h-44 w-28 md:w-44"
          />
        </div>

        {/* Information */}
        {isAuthenticated ? (
          <div className="flex flex-col items-center mt-8 md:mt-2">
            <div className="border border-transparent p-4 rounded-md mt-8 md:mt-14 max-w-6xl text-center">
              <p className="text-lg md:text-2xl font-mono text-slate-400 font-bold">
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
              className="text-2xl md:text-4xl text-blue-500 mt-6 md:mt-10 transition-all duration-300 transform hover:translate-x-2"
            >
              Explore Secrets <span className="ml-2">&#8594;</span>
            </Link>
          </div>
        ) : (
          <p className="text-lg md:text-xl mt-6 md:mt-10">
            Log in to start sharing your secrets securely.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
