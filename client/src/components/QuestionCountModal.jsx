import React, { useState } from "react";

export default function QuestionCountModal({ category, onStart, onCancel }) {
    const [numQuestions, setNumQuestions] = useState(5);
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Start Quiz: <span className="text-cyan-400">{category}</span></h2>
                <p className="text-gray-400 mb-6">How many questions do you want?</p>
                <div className="flex justify-center items-center space-x-4 mb-8">
                     <button onClick={() => setNumQuestions(n => Math.max(1, n - 1))} className="bg-gray-700 rounded-full w-10 h-10 text-2xl font-bold">-</button>
                     <span className="text-3xl font-bold w-16 text-center">{numQuestions}</span>
                     <button onClick={() => setNumQuestions(n => Math.min(20, n + 1))} className="bg-gray-700 rounded-full w-10 h-10 text-2xl font-bold">+</button>
                </div>
                <div className="flex justify-between space-x-4">
                    <button onClick={onCancel} className="w-full py-2 px-4 font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-all">Cancel</button>
                    <button onClick={() => onStart(numQuestions)} className="w-full py-2 px-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">Start</button>
                </div>
            </div>
        </div>
    );
}