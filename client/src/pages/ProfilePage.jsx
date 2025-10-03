import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "../context/UserContext";
import { fetchUser, getUserResults } from "../utils/api";

export default function ProfilePage() {
  const navigate = useNavigate();  
  const { user } = useUser(); 
  const [currentUser, setCurrentUser] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        // ✅ Fetch current logged-in user details
        const userData = await fetchUser();
        // console.log("User from fetchUser:", userData);
        setCurrentUser(userData);

        // ✅ Fetch this user's quiz results
        if (userData?._id) {
          const res = await getUserResults();
          console.log(res);
          
          setResults(res);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        Loading profile...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center text-red-400 mt-12">
        ⚠️ No user data found. Please log in again.
      </div>
    );
  }

  const latestResult = results.length > 0 ? results[0] : null;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-white">
      {/* --- User Info --- */}
      <div className="bg-gray-800/70 p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        <p><span className="font-semibold">Username:</span> {currentUser.username}</p>
        <p><span className="font-semibold">Email:</span> {currentUser.email}</p>
        <p><span className="font-semibold">Role:</span> {currentUser.role}</p>
      </div>

      {/* --- Quiz Results --- */}
      <div className="bg-gray-800/70 p-6 rounded-2xl shadow-lg" onClick={navigate("/all-results")}>
        <h2 className="text-3xl font-bold mb-6">Quiz History</h2>

        {!latestResult ? (
          <p className="text-gray-400">No quiz attempts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Score</th>
                  <th className="px-4 py-2 text-left">Correct</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                  <tr  className="border-t border-gray-700 hover:bg-gray-700/40">
                    <td className="px-4 py-2">{latestResult.quizCategory}</td>
                    <td className="px-4 py-2 font-bold">{latestResult.score}</td>
                    <td className="px-4 py-2">{latestResult.correctAnswers}</td>
                    <td className="px-4 py-2">{latestResult.totalQuestions}</td>
                    <td className="px-4 py-2">
                      {new Date(latestResult.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
