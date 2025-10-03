import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizPage({ onFinishQuiz }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const questions = useMemo(() => state?.questions || [], [state?.questions]);
  const categoryName = useMemo(() => state?.categoryName || "Quiz", [state?.categoryName]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz finished
      if (onFinishQuiz) {
        onFinishQuiz(score, questions.length);
      }
      navigate("/results", {
        state: { score, total: questions.length, category: categoryName },
      });
    }
  };

  const getButtonClass = (option) => {
    if (!isAnswered) return "bg-gray-700 hover:bg-gray-600";
    if (option === currentQuestion.correctAnswer)
      return "bg-green-500 animate-pulse-correct";
    if (option === selectedAnswer) return "bg-red-500";
    return "bg-gray-700 opacity-50";
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="mb-6">
          <p className="text-lg text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-6">
          {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
              className={`p-4 rounded-lg text-left text-lg font-medium transition-all duration-300 transform hover:scale-105 ${getButtonClass(
                option
              )}`}
            >
              {option}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className="w-full md:w-auto py-3 px-8 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
