import React, { useState } from "react";
import { MailIcon, LockIcon } from "../components/Icons";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user in context
      setUser(res.data.user);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-white text-center">Welcome Back!</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <MailIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="you@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <LockIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="••••••"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center text-yellow-400 mt-2">{message}</p>}
      </div>
    </div>
  );
}
