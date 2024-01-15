import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-8">
      <div className="container mx-auto">
        <p className="text-sm mb-4">
          &copy; 2024 Aditya Mishra. All rights reserved.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <a
            href="https://github.com/Ciriously"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
