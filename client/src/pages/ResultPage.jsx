import React, { useEffect } from "react";
import { TrophyIcon, RefreshCwIcon } from "../components/Icons";
import CelebrationEffect from "../components/CelebrationEffect";
import { useLocation, useNavigate } from "react-router-dom";
import { saveResult } from "../utils/api";
import { useUser } from "../context/UserContext";

export default function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useUser();

    const { score = 0, total = 0, category = "Quiz" } = state || {};
    const userId  = user?._id;

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const isPass = percentage >= 60;
    const strokeDashoffset = 283 - (283 * percentage) / 100;

    useEffect(() => {
        const save = async () => {
            if (!userId) return;
            try {
                await saveResult({
                    quizCategory: category,
                    score: percentage,
                    totalQuestions: total,
                    correctAnswers: score,
                  });
                console.log("Result saved successfully");
            } catch (err) {
                console.log("Ener Saving Result", err);
            }
        };
        save();
    }, [score, total, category, userId]);
    
    const handlePlayAgain = () => {
        navigate("/", { replace: true });
    };

    const handleLeaderboard = () => {
        navigate("/leaderboard", { state: { category } });
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center animate-fade-in">
            {isPass && <CelebrationEffect />}
            <div className="relative z-10 bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
                <h1 className="text-4xl font-extrabold mb-4">{isPass ? "Congratulations!" : "Better Luck Next Time!"}</h1>
                <p className="text-gray-400 mb-6">{isPass ? "You passed the quiz with flying colors." : "Don't worry, practice makes perfect!"}</p>
                
                <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                        <circle 
                            className={isPass ? "text-green-500" : "text-red-500"}
                            strokeWidth="10" 
                            strokeDasharray="283"
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor" 
                            fill="transparent" 
                            r="45" cx="50" cy="50"
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{percentage}%</span>
                        <span className="text-gray-400">{score}/{total} Correct</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={handlePlayAgain} className="w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transform hover:-translate-y-1 transition-all duration-300">
                        <RefreshCwIcon className="w-5 h-5"/>
                        {isPass ? "Play Another Quiz" : "Try Again"}
                    </button>
                    <button onClick={handleLeaderboard} className="w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-all">
                        <TrophyIcon className="w-5 h-5"/>
                        View Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
};