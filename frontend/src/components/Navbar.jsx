import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.webp';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('userEmail'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!sessionStorage.getItem('userEmail'));
    };

    // Listen for custom event "authChange"
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-16 w-16 rounded-full" />
      </Link>

      <div className="flex space-x-6">
        <NavLink to="/" className="text-blue-600 font-bold text-lg hover:text-blue-800">Home</NavLink>
        <NavLink to="/about" className="text-green-600 font-bold text-lg hover:text-green-800">About</NavLink>

        {isLoggedIn ? (
          <NavLink to="/logout" className="text-red-600 font-bold text-lg hover:text-red-800">Logout</NavLink>
        ) : (
          <NavLink to="/login" className="text-red-600 font-bold text-lg hover:text-red-800">Login</NavLink>
        )}

        <NavLink to="/resume" className="text-purple-600 font-bold text-lg hover:text-purple-800">Resume</NavLink>
      </div>
    </nav>
  );
}