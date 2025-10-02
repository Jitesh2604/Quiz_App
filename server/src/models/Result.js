import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        quizCategory: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            default: 0,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        correctAnswers: {
            type: Number,
            required: true,
        },
    }, { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;