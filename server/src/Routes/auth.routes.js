import express from "express";
import { signup, login, getMe } from "../Controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getMe);

export default router;