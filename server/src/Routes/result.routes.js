import express from "express";
import { saveResult, getUserResults, getLeaderboard } from "../Controllers/result.controller.js";
import { Protact } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", Protact, saveResult);
router.get("/my-results", Protact, getUserResults);
router.get("/leaderboard/:category", getLeaderboard);

export default router;