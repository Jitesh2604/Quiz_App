import React, { useState } from "react";

export default function QuestionCountModal({ category, onStart, onCancel }) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [level, setLevel] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await onStart(numQuestions, level); // pass both numQuestions and level
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Start Quiz: <span className="text-cyan-400">{category?.name}</span>
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center text-center mt-8 space-y-4">
            <div className="flex space-x-2" aria-label="Loading">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            </div>
            <p className="text-white text-lg">
              Generating Questions with Gemini AI...
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-2">Select difficulty:</p>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full mb-6 p-2 rounded-lg bg-gray-700 text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <p className="text-gray-400 mb-6">How many questions do you want?</p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <button
                onClick={() => setNumQuestions((n) => Math.max(1, n - 1))}
                className="bg-gray-700 rounded-full w-10 h-10 text-2xl font-bold"
              >
                -
              </button>
              <span className="text-3xl font-bold w-16 text-center">
                {numQuestions}
              </span>
              <button
                onClick={() => setNumQuestions((n) => Math.min(20, n + 1))}
                className="bg-gray-700 rounded-full w-10 h-10 text-2xl font-bold"
              >
                +
              </button>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                onClick={onCancel}
                className="w-full py-2 px-4 font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleStart} // <-- use handleStart here
                className="w-full py-2 px-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Start
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
