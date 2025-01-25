import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.webp'; // Import your logo

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-40 w-40 rounded-full p-2 mr-2" />
        </Link>
        <div className="flex space-x-4">
          <NavLink to="/" className="text-gray-600 hover:text-gray-800">Home</NavLink>
          <NavLink to="/about" className="text-gray-600 hover:text-gray-800">About</NavLink>
          <NavLink to="/login" className="text-gray-600 hover:text-gray-800">Login</NavLink>
        </div>
      </div>
    </nav>
  );
}
