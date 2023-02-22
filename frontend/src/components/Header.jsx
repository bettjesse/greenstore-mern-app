import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center mb-3 md:mb-0">
        <img src="/path/to/logo.png" alt="Logo" className="h-8" />
        <span className="text-xl font-bold ml-2">Ecommerce Site</span>
      </div>

      {/* Search Field */}
      <div className="flex items-center ml-4 w-full md:w-auto">
        <span className="absolute left-4 text-gray-400"><FaSearch /></span>
        <input type="text" placeholder="Search..." className="w-full md:w-64 px-10 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:bg-white focus:text-gray-900" />
      </div>

      {/* Cart and Login */}
      <div className="flex items-center ml-4">
        <button className="bg-transparent text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 mr-6">
          Login
        </button>
        <span className="relative inline-block">
          <FaShoppingCart className="h-6 w-6 text-white hover:text-gray-400 focus:outline-none focus:text-gray-400" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            0
          </span>
        </span>
      </div>
    </header>
  );
};

export default Header;
