import React, { useEffect, useState } from "react";
import { TrophyIcon } from "../components/Icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function LeaderboardPage({ currentUser }) {
  const location = useLocation();
  const category = location.state?.category;
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    } 

    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get(`/api/leaderboard/${category}`);
        setLeaderboardData(
          data.map((player, index) => ({
            rank: index + 1,
            _id: player.user._id,
            name: player.user.name,
            score: player.score,
            isCurrentUser: player.user._id === currentUser?._id,
          }))
        );
      } catch (err) {
        console.log("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [category, currentUser]);

  if (loading)
    return (
      <div className="text-white text-center mt-20">Loading leaderboard...</div>
    );

  if (leaderboardData.length === 0)
    return <div className="text-white text-center mt-20">No scores yet.</div>;

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
                  {player.name?.charAt(0).toUpperCase() || "?"}
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
