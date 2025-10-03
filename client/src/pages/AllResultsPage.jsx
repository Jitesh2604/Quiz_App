import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { fetchUser, getUserResults } from "../utils/api";

export default function AllResultsPage() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadResults = async () => {
      try {
        const userData = await fetchUser();
        setCurrentUser(userData);

        if (userData?._id) {
          const res = await getUserResults();
          setResults(res);
        }
      } catch (err) {
        console.error("Error fetching all results:", err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        Loading results...
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

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white">
      <h2 className="text-3xl font-bold mb-8">All Quiz Results</h2>

      {results.length === 0 ? (
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
              {results.map((r, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-700 hover:bg-gray-700/40"
                >
                  <td className="px-4 py-2">{r.quizCategory}</td>
                  <td className="px-4 py-2 font-bold">{r.score}</td>
                  <td className="px-4 py-2">{r.correctAnswers}</td>
                  <td className="px-4 py-2">{r.totalQuestions}</td>
                  <td className="px-4 py-2">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
