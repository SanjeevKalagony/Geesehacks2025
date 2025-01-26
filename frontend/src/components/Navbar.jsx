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
    <div className="relative">
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 blur-lg opacity-75"></div>
      <nav className="relative bg-white shadow-md rounded-xl">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 blur-lg opacity-75"></div>
            <Link to="/" className="relative flex items-center">
              <img src={logo} alt="Logo" className="h-40 w-40 rounded-full p-2 mr-2 cursor-pointer" />
            </Link>
          </div>
          <div className="flex space-x-6">
            <NavLink to="/" className="text-blue-600 font-bold text-lg hover:text-blue-800">Home</NavLink>
            <NavLink to="/about" className="text-green-600 font-bold text-lg hover:text-green-800">About</NavLink>
            {isLoggedIn ? (
              <NavLink to="/logout" className="text-red-600 font-bold text-lg hover:text-red-800">Logout</NavLink>
            ) : (
              <NavLink to="/login" className="text-red-600 font-bold text-lg hover:text-red-800">Login</NavLink>
            )}
            <NavLink to="/resume" className="text-purple-600 font-bold text-lg hover:text-purple-800">Resume</NavLink>
            <NavLink to="/mock-interview" className="text-pink-600 font-bold text-lg hover:text-pink-800">Mock Interview</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}