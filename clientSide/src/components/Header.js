import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-600 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl flex items-center">
          {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
          AKS's ToDo App
        </h1>

        {/* Navigation */}
        <nav>
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
            <Link to="/logout" className="text-white hover:text-gray-300">Logout</Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            {menuOpen && (
              <ul className="absolute right-0 top-12 bg-gray-800 rounded shadow-md">
                <li><Link to="/about" className="block px-4 py-2 text-white">About Us</Link></li>
                <li><Link to="/login" className="block px-4 py-2 text-white">Login</Link></li>
                <li><Link to="/logout" className="block px-4 py-2 text-white">Logout</Link></li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
