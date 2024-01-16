import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col lg:flex-row h-screen font-Inter">
      {/* Left Section with Black Background (Hidden on Small Screens) */}
      <div className="hidden lg:flex lg:flex-none lg:w-1/2 bg-black text-white p-10 flex flex-col justify-between items-center relative">
        {/* Logo and Text on Top */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="lock.gif"
            alt="Logo"
            className="mb-2"
            style={{ width: "100px", height: "100px" }}
          />
          <p className="text-xl font-bold font-mono text-center">
            HushHub by Aditya
          </p>
        </div>

        {/* Hello World Text in the Middle */}
        <div className="text-center mb-4">
          <p className="text-6xl font-Inter font-bold">
            Where Confidentiality Meets Connectivity.
          </p>
          {/* Additional Text below the main heading */}
          <p className="text-xl font-Inter font-light text-white mt-4">
            Discover a secure way to connect with HushHub.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center font-Inter text-sm">
          &copy; 2024 Aditya Mishra. All rights reserved.
        </footer>
      </div>

      {/* Right Section with Gradient Background and Stylish Login Form */}
      <div className="flex-grow p-8 lg:p-16 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-white text-black relative">
        {/* Mobile Title and Logo (Visible on Small Screens) */}
        <div className="lg:hidden mb-8 text-center">
          <img
            src="lock.gif"
            alt="Logo"
            className="mb-1 ml-20"
            style={{ width: "60px", height: "60px" }}
          />
          <p className="text-2xl font-bold font-mono">HushHub by Aditya</p>
        </div>

        <div className="bg-white bg-opacity-100 shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-4xl font-bold mb-6 text-center">Signup</h2>

          {/* New Email Field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-l font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Terms and Conditions Text */}
          <p className="text-sm mb-6">
            By continuing, you agree to the{" "}
            <a href="#" className="underline text-blue-500">
              Self Service PSS
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-blue-500">
              Privacy Policy
            </a>
            .
          </p>

          {/* Animated Stylish Login Button with Logo */}
          <button
            className="bg-blue-600 hover:bg-sky-500 text-white font-mono py-3 px-6 rounded-half w-full transition duration-300 ease-in-out transform hover:scale-105 mb-4 flex items-center justify-center"
            onClick={() => loginWithRedirect()}
          >
            <img src="star.gif" alt="Facebook Logo" className="w-8 h-8 mr-2" />
            Continue with Your Account
          </button>

          {/* Separator with "Or" */}
          <div className="text-gray-500 text-sm mb-6 flex items-center justify-center">
            <hr className="flex-grow border-t" />
            <span className="mx-2">Or</span>
            <hr className="flex-grow border-t" />
          </div>

          <div className="flex flex-col items-center mb-6">
            <button className="bg-white border border-black text-black font-mono font-bold py-3 px-6 rounded-half mb-2 w-full flex items-center justify-center">
              <img
                src="google.png"
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              />
              Continue with Google
            </button>
            <button className="bg-white border border-black text-black font-mono font-bold py-3 px-6 rounded-half mb-2 w-full flex items-center justify-center">
              <img
                src="github.png"
                alt="GitHub Logo"
                className="w-6 h-6 mr-2"
              />
              Continue with GitHub
            </button>
          </div>

          {/* Footer for Mobile */}
          <footer className="text-center font-Inter text-sm">
            &copy; 2024 Aditya Mishra. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
