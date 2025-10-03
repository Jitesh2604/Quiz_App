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
// Categories
// ============================
export const getCategories = async () => {
    const res = await API.get("/categories");
    return res.data;
  };
  
  // ============================
  // Questions
  // ============================
  export const getQuestions = async ({ category, limit }) => {
    const res = await API.post("/questions", { category, limit });
    return res.data;
  };
  
  // ============================
  // Quiz Results
  // ============================
  export const getUserResults = async (userId) => {
    const res = await API.get(`/quiz/results/${userId}`);
    return res.data;
  };
  
  export const submitQuiz = async (data) => {
    const res = await API.post("/quiz/submit", data);
    return res.data;
  };
  
  // ============================
  // Leaderboard
  // ============================
  export const getLeaderboard = async () => {
    const res = await API.get("/leaderboard");
    return res.data;
  };
  
  

export default API;