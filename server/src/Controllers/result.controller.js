import Result from "../models/Result.js";

export const saveResult = async (req, res) => {
    try {
        const { quizCategory, score, totalQuestions, correctAnswers } = req.body;

        const userId = req.user.id;

        const newResult = new Result({
            user: userId,
            quizCategory,
            score,
            totalQuestions,
            correctAnswers,
        });

        await newResult.save();
        res.status(201).json({ message: "Result saved successfully", result: newResult });
    } catch (err) {
        res.status(500).json({ message: "Error saving result", err });
    }
};

export const getUserResults = async (req, res) => {
    try {
        const userId = req.user.id;
        const results = await Result.find({ user: userId }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Error fetching results", err });
    }
};

// controllers/resultController.js

import Result from "../models/Result.js";
import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$user", 
          totalScore: { $sum: "$score" }, 
          attempts: { $sum: 1 }, 
        },
      },
      {
        $lookup: {
          from: "users", 
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          username: "$userInfo.username",
          email: "$userInfo.email",
          totalScore: 1,
          attempts: 1,
        },
      },
      { $sort: { totalScore: -1 } }, 
      { $limit: 20 }, // top 20
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};


