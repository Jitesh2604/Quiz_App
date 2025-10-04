import React, { useState } from "react";
import { MailIcon, LockIcon } from "../components/Icons";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import jwtDecode from "jwt-decode";


export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      let token = res.data.token;
      localStorage.setItem("token", token);

      const decodedUser = jwtDecode(token); 
      setUser(decodedUser); 

      setMessage("Login successful! Redirecting...");
      // console.log("User logged in:", res.data);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">Welcome Back!</h2>
          <p className="mt-2 text-gray-400">
            Login to continue your quiz adventure
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <MailIcon className="w-5 h-5" />
            </div>
            <input
              placeholder="you@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <LockIcon className="w-5 h-5" />
            </div>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}  
              placeholder="••••••••"
              type="password"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-cyan-400 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Login
            </button>
          </div>
          {message && <p className="mt-3 text-center text-sm">{message}</p>}
        </form>
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium text-cyan-400 hover:underline"
          >
            Create One
          </button>
        </p>
      </div>
    </div>
  );
}
