import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ============================
// Auth
// ============================
export const fetchUser = async () => {
  try {
    const res = await API.get("/auth/me");
    return res.data; 
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};
// ============================
// Categories
// ============================
export const getCategories = async () => {
    const res = await API.get("/ai/categories");
    return res.data.data;
  };
  
  // ============================
  // Questions
  // ============================
  export const getQuestions = async ({ category, limit }) => {
    const res = await API.post("/ai/questions", { category, count: limit });
    return res.data;
  };
  
  // ============================
  // Quiz Results
  // ============================
  export const getUserResults = async () => {
    const res = await API.get(`/results/my-results`);
    return res.data;
  };
  
  export const saveResult = async (data) => {
    try {
      const res = await API.post("/results", data); // <-- use singular "result"
      return res.data;
    } catch (err) {
      console.error("Error saving result:", err);
      throw err; // re-throw to handle in component
    }
  };
  
  // ============================
  // Leaderboard
  // ============================
  export const getLeaderboard = async () => {
    const res = await API.get("/results/leaderboard");
    return res.data;
  };


export default API;