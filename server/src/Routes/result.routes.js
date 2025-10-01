import express from "express";
import { saveResult, getUserResults, getLeaderboard } from "../Controllers/result.controller";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, saveResult);
router.get("/my-results", protect, getUserResults);
router.get("/leaderboard/:category", getLeaderboard);

export default router;