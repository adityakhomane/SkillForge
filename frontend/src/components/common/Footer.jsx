import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">SkillForge</h2>
            <p className="text-gray-400">Empowering learners with cutting-edge skills for the digital age</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/about" className="hover:text-blue-400">About Us</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>
            <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SkillForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;