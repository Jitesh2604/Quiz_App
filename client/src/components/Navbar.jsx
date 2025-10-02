import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrainIcon, UserIcon } from "./Icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/categories", text: "Categories" },
    { to: "/leaderboard", text: "Leaderboard" },
    { to: "/about", text: "About" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <BrainIcon className="h-10 w-10 text-cyan-400 animate-pulse" />
              <span className="text-2xl font-bold text-white tracking-wider">QuizWhiz</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                    location.pathname === link.to
                      ? "text-cyan-400 font-bold"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <UserIcon className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.to
                  ? "text-cyan-400 font-bold"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {link.text}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex justify-center items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <UserIcon className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
  