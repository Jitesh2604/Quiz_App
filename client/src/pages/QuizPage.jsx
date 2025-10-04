import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { saveResult } from "../utils/api";

export default function QuizPage({ onFinishQuiz }) {
  const { user } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();

  // --- Store questions in state so page survives refresh ---
  const [questions] = useState(() => state?.questions || []);
  const categoryName = useMemo(() => state?.categoryName || "Quiz", [state?.categoryName]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const quizFinishedRef = useRef(false);
  const currentQuestion = questions[currentQuestionIndex] || {};

  // --- Redirect if no questions ---
  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  // --- Timer effect ---
  useEffect(() => {
    if (isAnswered || quizFinishedRef.current) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, currentQuestionIndex]);

  // --- Handle answer selection ---
  const handleAnswerClick = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // --- Handle next question or finish quiz ---
  const handleNextQuestion = async () => {
    if (quizFinishedRef.current) return;

    // If last question, finish quiz
    if (currentQuestionIndex >= questions.length - 1) {
      quizFinishedRef.current = true;

      if (user) {
        try {
          await saveResult({
            user: user._id || user.id,
            quizCategory: categoryName,
            score,
            totalQuestions: questions.length,
            correctAnswers: score,
          });
        } catch (err) {
          console.log("Error saving result:", err);
        }
      }

      if (onFinishQuiz) onFinishQuiz(score, questions.length);

      navigate("/results", {
        state: {
          score,
          total: questions.length,
          category: categoryName,
          userId: user._id,
        },
      });

      return;
    }

    // Move to next question
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(60);
  };

  // --- Button styling ---
  const getButtonClass = (option) => {
    if (!isAnswered) return "bg-gray-700 hover:bg-gray-600";
    if (option === currentQuestion.correctAnswer) return "bg-green-500 animate-pulse-correct";
    if (option === selectedAnswer) return "bg-red-500";
    return "bg-gray-700 opacity-50";
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="mb-4 text-center text-xl font-bold text-yellow-400">
          Time Left: {timeLeft}s
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">
          {currentQuestion?.question || "Loading question..."}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion?.options?.length > 0 ? (
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
                className={`p-4 rounded-lg text-left text-lg font-medium transition-all duration-300 transform hover:scale-105 ${getButtonClass(option)}`}
              >
                {option}
              </button>
            ))
          ) : (
            <p className="text-gray-400">Loading options...</p>
          )}
        </div>

        {isAnswered && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className="w-full md:w-auto py-3 px-8 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
