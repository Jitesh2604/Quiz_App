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

export const getLeaderboard = async (req, res) => {
    try{
        const { quizCategory } = req.params;
        const leaderboard = await Result.find({ quizCategory})
            .populate("user", "username email")
            .sort({ score: -1 })
            .limit(10);

        res.json(leaderboard);
    }catch(err){
        res.status(500).json({ message: "Error fetching leaderboard", err });
    }
};

