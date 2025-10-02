import React from "react";
import { UserIcon, MailIcon, LockIcon } from "../components/Icons";

export default function SignupPage({ onSignup, onNavigate }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in">
      <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">Create Account</h2>
          <p className="mt-2 text-gray-400">Join the QuizWhiz community!</p>
        </div>
        <form className="space-y-6" onSubmit={onSignup}>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <UserIcon className="w-5 h-5" />
            </div>
            <input
              placeholder="Full Name"
              type="text"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <MailIcon className="w-5 h-5" />
            </div>
            <input
              placeholder="you@example.com"
              type="email"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <LockIcon className="w-5 h-5" />
            </div>
            <input
              placeholder="••••••••"
              type="password"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <a
            onClick={() => onNavigate("login")}
            className="cursor-pointer font-medium text-cyan-400 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
