import { generateCategories, generateQuestions } from "../Service/aiService.js";

/**
 * @desc    Get AI-generated quiz categories
 * @route   GET /api/ai/categories
 * @access  Public
 */ 

export const getCategories = async (req, res) => {
    try {
        const categories = await generateCategories();
        res.status(200).json({
            success: true,
            message: "Categories generated successfully.",
            data: categories,
        });
    } catch (err) {
        console.error("Error in getCategories:", err.message);
        res.status(500).json({
          success: false,
          message: "Failed to generate categories.",
        });
    }
};

/**
 * @desc    Get AI-generated quiz questions for a category & difficulty
 * @route   POST /api/ai/questions
 * @access  Public
 */
export const getQuestions = async (req, res) => {
    try {
      const { category, count = 5, level = "medium" } = req.body;
  
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category is required.",
        });
      }
  
      const questions = await generateQuestions(category, count, level);
  
      res.status(200).json({
        success: true,
        message: `Questions for '${category}' (${level}) generated successfully.`,
        data: questions,
      });
    } catch (err) {
      console.error("Error in getQuestions:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to generate questions.",
      });
    }
  };
  