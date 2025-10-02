import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const JWT_SECRET = process.env.JWT_SECRET || "HelloQuizApp";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        };

        const user = new User({
            username,
            email,
            password,
            role: "user"
        });

        await user.save();
        res.status(201).json({ message: "USer registerd successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getMe = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(401).json({ message: "Invalid token", err });
    }
}