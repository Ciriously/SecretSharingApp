import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Redirect to the homepage after logout
    navigate("/");
    onLogout(); // Call the provided onLogout function
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-black p-7 text-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="logo.png" alt="Logo" className="mr-1 h-12" />
          <h1 className="text-slate text-3xl font-inter font-bold">HushHub</h1>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4 relative">
            <a
              href="https://github.com/Ciriously/SecretSharingApp/blob/main/README.md"
              className="text-white mr-8 font-inter hover:text-blue-500 transition duration-300"
            >
              Docs
            </a>
            <div className="group inline-block relative">
              <button
                className="text-white mr-8 focus:outline-none hover:text-blue-500 font-inter transition duration-300"
                onClick={toggleDropdown}
              >
                Features
              </button>

              {isDropdownOpen && (
                <div className="absolute bg-white text-black mt-1 rounded-lg overflow-hidden shadow-md transform transition-transform origin-top-right">
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
                </div>
              )}
            </div>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <p className="font-inter font-bold text-xl">
                Welcome, {user.email}!
              </p>
              <button
                className="bg-white text-black font-inter font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button className="text-slate hover:text-blue-500 transition duration-300 text-xl">
                Signup
              </button>
              <button className="text-slate hover:text-blue-500 transition duration-300 text-xl">
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
