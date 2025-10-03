// HomePage.jsx
import React, { useEffect, useState } from "react";
import { getCategoryIcon } from "../utils/categoryIcons";
import { getCategories, getUserResults, getQuestions } from "../utils/api";
import QuestionCountModal from "../components/QuestionCountModal";

export default function HomePage({ user, onStartQuiz }) {
  const [categories, setCategories] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (user?._id) {
        try {
          const res = await getUserResults(user._id);
          if (res.length > 0) setLastResult(res[res.length - 1]);
        } catch (error) {
          console.error("Error fetching results:", error);
        }
      }
    };
    fetchResults();
  }, [user]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleQuestionSelect = async (count) => {
    if (!selectedCategory) return;

    try {
      const questions = await getQuestions({
        category: selectedCategory.name,
        limit: count,
      });

      // Pass questions to QuizPage
      onStartQuiz(questions, selectedCategory.name);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
    setShowModal(false);
  };

  return (
    <div className="py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white">
          Welcome, {user?.name || "Player"}!
        </h1>
        {lastResult ? (
          <p className="mt-4 text-lg text-yellow-400">
            🎉 Last Score: <span className="font-bold">{lastResult.score}</span>
          </p>
        ) : (
          <p className="mt-4 text-lg text-gray-400">
            Choose a category to start your first challenge.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const { Icon, color } = getCategoryIcon(category.name);
          return (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-700 text-center transform transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:shadow-2xl"
            >
              <Icon className={`h-16 w-16 mx-auto mb-4 ${color}`} />
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
          );
        })}
      </div>

      {showModal && (
        <QuestionCountModal
          category={selectedCategory}
          onClose={() => setShowModal(false)}
          onSelect={handleQuestionSelect}
        />
      )}
    </div>
  );
}
