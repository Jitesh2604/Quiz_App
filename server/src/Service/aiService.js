import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function callGenerativeAI(prompt) {
    try {
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("Gemini Error:", err);
            throw new Error("Gemini API call failed");
        };

        const result = await response.json();
        const text = result.candidates?.[0]?.parts?.[0]?.text;

        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    } catch (err) {
        console.error("AI Service Error:", err.message);
        throw err;
    }
};

export async function generateCategories() {
    const prompt = `
    Generate 8 fun and diverse quiz categories. 
    Return them as an array of objects with fields: "name" and "description".
    Example: [{ "name": "Science", "description": "Explore the wonders of physics and chemistry." }]
    `;
  
    return await callGenerativeAI(prompt);
};

export async function generateQuestions(category, count = 5, level = "medium") {
    const prompt = `
    Create ${count} ${level} difficulty multiple-choice quiz questions for category "${category}".
    Each question must include:
    - "question": string
    - "options": array of 4 strings
    - "correctAnswer": string (must exactly match one of the options)
  
    Return strictly in JSON format.
    `;
  
    return await callGenerativeAI(prompt);
};

