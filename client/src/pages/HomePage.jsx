import React, { useEffect, useState } from "react";
import { BeakerIcon, BookOpenIcon, CpuChipIcon } from "../components/Icons";
import API from "../utils/api";

export default function HomePage({ user, onCategorySelect }) {
  const [lastResult, setLastResult] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async ()=> {
      try {
        const catRes = await API.get("/categories");
        setCategories(catRes.data);

        if (user?._id) {
          const resultRes = await API.get(`/quiz/results/${user._id}`);
          if(resultRes.data?.length > 0) {
            setLastResult(resultRes.data[0]);
          }
        }
      } catch (err) {
        console.error("Error loading home data", err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white">
          Welcome, {user?.name || "Player"}!
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          {lastResult
            ? `Your last score: ${lastResult.score}/${lastResult.totalQuestions}`
            : "Choose a category to start your first challenge."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <p className="mt-4 text-lg text-gray-400">
          Choose a category to start your challenge.
        </p>
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => onCategorySelect(category.name)}
            className="cursor-pointer bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-700 text-center transform transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:shadow-2xl"
          >
            {category.name === "Science" && (
              <BeakerIcon className="h-16 w-16 mx-auto mb-4 text-cyan-400" />
            )}
            {category.name === "History" && (
              <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-green-400" />
            )}
            {category.name === "Technology" && (
              <CpuChipIcon className="h-16 w-16 mx-auto mb-4 text-purple-400" />
            )}
            <h3 className="text-2xl font-bold text-white">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
