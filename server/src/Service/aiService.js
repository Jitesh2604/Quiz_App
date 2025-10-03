import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "models/gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${API_KEY}`;

async function callGenerativeAI(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini Error:", err);
      throw new Error("Gemini API call failed");
    }

    const data = await response.json();
    // console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates[0].content) {
      throw new Error("No candidates returned from Gemini.");
    }

    let rawText = data.candidates[0].content.parts[0].text || "";

    // Remove possible markdown fences
    rawText = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      console.error("Raw text received:", rawText);
      throw new Error("Failed to parse Gemini response as JSON.");
    }

    return parsed;
  } catch (err) {
    console.error("AI Service Error:", err.message);
    throw err;
  }
}

export async function generateCategories() {
  const prompt = `
    Generate 8 fun and diverse quiz categories. 
    Return them as an array of objects with fields: "name" and "description".
    Example: [{ "name": "Science", "description": "Explore the wonders of physics and chemistry." }]
  `;

  return await callGenerativeAI(prompt);
}

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
}
