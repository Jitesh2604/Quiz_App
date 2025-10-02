import express from "express";
import { getCategories, getQuestions } from "../Controllers/aiController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/questions", getQuestions);

export default router;