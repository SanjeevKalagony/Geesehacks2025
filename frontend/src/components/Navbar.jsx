import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.webp'; // Import your logo

export default function Navbar() {
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
          <div className="flex space-x-4">
            <NavLink to="/" className="text-gray-600 hover:text-gray-800">Home</NavLink>
            <NavLink to="/about" className="text-gray-600 hover:text-gray-800">About</NavLink>
            <NavLink to="/login" className="text-gray-600 hover:text-gray-800">Login</NavLink>
            <NavLink to="/resume" className="text-gray-600 hover:text-gray-800">Resume</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
