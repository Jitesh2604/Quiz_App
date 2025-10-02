import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundEffects from "./components/BackgroundEffects";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        {/* Navbar will always be visible */}
        <BackgroundEffects />
        <Navbar />

        {/* Main content area */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
