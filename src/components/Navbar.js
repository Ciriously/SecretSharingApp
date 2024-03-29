import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black p-7 text-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src="logo.png" alt="Logo" className="mr-1 h-12" />
            <h1 className="text-slate text-3xl font-inter font-bold">
              HushHub
            </h1>
          </div>
        </Link>

        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileNav}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {isAuthenticated && (
            <Link
              to="/secrets"
              className="bg-clip-text text-transparent font-inter font-extrabold bg-gradient-to-r from-blue-500 to-white hover:text-blue-500 transition duration-300 px-4 py-2 rounded-full"
            >
              Secrets
            </Link>
          )}
          <a
            href="https://github.com/Ciriously/SecretSharingApp/blob/main/README.md"
            className="text-white font-inter hover:text-blue-500 transition duration-300"
          >
            Docs
          </a>
          <div className="group inline-block relative">
            <button
              className="text-white focus:outline-none hover:text-blue-500 font-inter transition duration-300"
              onClick={toggleDropdown}
            >
              Features
            </button>

            {isDropdownOpen && (
              <div className="absolute bg-white text-black mt-1 font-inter font-medium rounded-lg overflow-hidden shadow-md transform transition-transform origin-top-right">
                <ul className="flex flex-col space-y-4 p-8 w-auto">
                  <li className="hover:bg-sky-200 px-4 py-2 transition duration-300">
                    Real-time messaging
                  </li>
                  <li className="hover:bg-sky-200 px-4 py-2 transition duration-300">
                    End-to-end encryption
                  </li>
                  <li className="hover:bg-sky-200 px-4 py-2 transition duration-300">
                    User-friendly interface
                  </li>
                  <li className="hover:bg-sky-200 px-4 py-2 transition duration-300">
                    Customizable settings
                  </li>
                </ul>
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <p className="font-inter font-bold text-xl">
                Welcome, {user.email}!
              </p>
              <button
                className="bg-white text-black font-inter font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                className="text-slate hover:text-blue-500 font-inter transition duration-300 text-xl"
                onClick={handleLogin}
              >
                Signup
              </button>
              <button
                className="text-slate hover:text-blue-500 transition duration-300 text-xl bg-white text-black font-inter font-bold py-2 px-4 rounded-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          )}
        </div>

        {isMobileNavOpen && (
          <div
            ref={mobileNavRef}
            className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50"
          >
            <div className="container mx-auto flex flex-col items-start">
              <button
                className="text-white mt-4 ml-4 focus:outline-none"
                onClick={toggleMobileNav}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              <div className="flex flex-col items-start space-y-4 mt-8">
                {isAuthenticated && (
                  <Link
                    to="/secrets"
                    className="bg-clip-text text-transparent font-inter font-extrabold bg-gradient-to-r from-blue-500 to-white hover:text-blue-500 transition duration-300 px-4 py-2 rounded-full"
                  >
                    Secrets
                  </Link>
                )}

                <a
                  href="https://github.com/Ciriously/SecretSharingApp/blob/main/README.md"
                  className="text-white font-inter hover:text-blue-500 transition duration-300"
                >
                  Docs
                </a>
                <div className="group inline-block relative">
                  <button
                    className="text-white focus:outline-none  hover:text-blue-500 font-inter transition duration-300"
                    onClick={toggleDropdown}
                  >
                    Features
                  </button>
                  {isDropdownOpen && (
                    <ul className="flex flex-col space-y-2 p-2">
                      <li className="hover:bg-gray-200 px-4 py-2 transition duration-300">
                        Real-time messaging
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-2 transition duration-300">
                        End-to-end encryption
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-2 transition duration-300">
                        User-friendly interface
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-2 transition duration-300">
                        Customizable settings
                      </li>
                    </ul>
                  )}
                </div>
                {isAuthenticated ? (
                  <button
                    className="bg-white text-black font-inter font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Log Out
                  </button>
                ) : (
                  <React.Fragment>
                    <button
                      className="text-white hover:text-blue-500 font-inter transition duration-300"
                      onClick={handleLogin}
                    >
                      Signup
                    </button>
                    <button
                      className="hover:text-blue-500 transition duration-300 bg-white text-black font-inter font-bold py-2 px-4 rounded-full"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
