import React from "react";
import { TrophyIcon } from "../components/Icons";
export default function LeaderboardPage() {
  const leaderboardData = [
    { rank: 1, name: "Alice", score: 2450, avatar: "A" },
    { rank: 2, name: "Bob", score: 2300, avatar: "B" },
    {
      rank: 3,
      name: "Quiz Taker",
      score: 2100,
      avatar: "Q",
      isCurrentUser: true,
    },
    { rank: 4, name: "Charlie", score: 2050, avatar: "C" },
    { rank: 5, name: "David", score: 1900, avatar: "D" },
    { rank: 6, name: "Eve", score: 1850, avatar: "E" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 animate-fade-in">
      <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex items-center justify-center mb-6">
          <TrophyIcon className="w-10 h-10 text-yellow-400 mr-4" />
          <h1 className="text-4xl font-extrabold text-white">Leaderboard</h1>
        </div>
        <div className="space-y-4">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center p-4 rounded-lg transition-all ${
                player.isCurrentUser
                  ? "bg-cyan-500/30 border border-cyan-500 scale-105"
                  : "bg-gray-700/50"
              }`}
            >
              <div className="flex items-center w-1/6">
                <span className="text-2xl font-bold text-gray-400 mr-4">
                  {player.rank}
                </span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl ${
                    player.isCurrentUser ? "bg-cyan-500" : "bg-purple-500"
                  }`}
                >
                  {player.avatar}
                </div>
              </div>
              <div className="w-4/6 pl-4">
                <p className="font-bold text-lg">{player.name}</p>
              </div>
              <div className="w-1/6 text-right">
                <p className="font-bold text-xl text-yellow-400">
                  {player.score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
