import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Resume from './components/Resume';
import MockInterview from './components/MockInterview';
import './index.css'; // Ensure this import is present

export default function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/mock-interview" element={<MockInterview />} />
      </Routes>
    </Router>
  );
}




