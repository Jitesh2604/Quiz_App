import React, { useState } from "react";

const BrainIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.38a2 2 0 0 1 1.94 2.52c-.22.64-.46 1.25-.73 1.82" />
      <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5v1.2a1 1 0 0 1-1 1h-.38a2 2 0 0 0-1.94 2.52c.22.64.46 1.25.73 1.82" />
      <path d="M4.5 10.5a2.5 2.5 0 0 1 0-5" />
      <path d="M19.5 10.5a2.5 2.5 0 0 0 0-5" />
      <path d="M12 13a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H9a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h1.5" />
      <path d="M12 13a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-1.5" />
      <path d="M12 13v8" />
      <path d="M9 21h6" />
    </svg>
  );
  
  const UserIcon = ({ className }) => (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
      </svg>
  );
  
  
  
  export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const navLinks = [
      { href: "#", text: "Home" },
      { href: "#", text: "Categories" },
      { href: "#", text: "Leaderboard" },
      { href: "#", text: "About" },
    ];
  
    return (
      <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
  
            {/* Logo and Brand Name */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center space-x-2">
                <BrainIcon className="h-10 w-10 text-cyan-400 animate-pulse" />
                <span className="text-2xl font-bold text-white tracking-wider">QuizWhiz</span>
              </a>
            </div>
  
            {/* Primary Nav Links (Desktop) */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
            
            {/* User Profile / Login Button */}
             <div className="hidden md:block">
               <button className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                   <UserIcon className="h-5 w-5"/>
                   <span>Login</span>
              </button>
             </div>
  
  
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon for menu open/close */}
                <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu, show/hide based on menu state. */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.text}
                  </a>
              ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
               <div className="flex items-center px-5">
                   <button className="w-full flex justify-center items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                       <UserIcon className="h-5 w-5"/>
                       <span>Login</span>
                  </button>
              </div>
          </div>
        </div>
      </nav>
    );
  }
  