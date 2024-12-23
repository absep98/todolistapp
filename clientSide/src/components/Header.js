import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the presence of a token
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage and update the state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/logout');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-600 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl flex items-center">My WorkList</h1>
        <div className="hidden md:flex space-x-4">
          <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          )}
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
              {isLoggedIn ? (
                <li><button onClick={handleLogout} className="block px-4 py-2 text-white">Logout</button></li>
              ) : (
                <li><Link to="/login" className="block px-4 py-2 text-white">Login</Link></li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;