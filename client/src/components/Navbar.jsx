import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrainIcon, UserIcon } from "./Icons"; // Assuming Icons.js exists
import API from "../utils/api";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/categories", text: "Categories" },
    { to: "/leaderboard", text: "Leaderboard" },
    { to: "/about", text: "About" },
  ];

  // Effect to close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      setLoadingUser(false);
      return;
    };

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        
        const data = await res.json();
        // console.log(data);
        setCurrentUser(data); 
      } catch (err) {
        console.error(err);
        setCurrentUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);


  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login");
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2" onClick={closeAllMenus}>
              <BrainIcon className="h-10 w-10 text-cyan-400 animate-pulse" />
              <span className="text-2xl font-bold text-white tracking-wider">QuizWhiz</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
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

            {/* User Section */}
            {loadingUser ? null : currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>{currentUser.username}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <UserIcon className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
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
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.to
                    ? "text-cyan-400 font-bold bg-gray-800"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.text}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-700">
              {currentUser ? (
                <div className="space-y-1">
                  <button
                    onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex justify-center items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}