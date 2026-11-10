import { GoogleGenerativeAI } from "@google/generative-ai";

// ============================================================
// Google Gemini AI Configuration
// ============================================================
// Get your FREE API key: https://aistudio.google.com/app/apikey
// 1. Go to the link above
// 2. Click "Create API Key"
// 3. Paste it below
// ============================================================

const GEMINI_API_KEY = "AIzaSyCrvImWDqCGp1gTn8g88FQHqNQXHXAh5JE"; // Gemini API Key for portfolio chatbot

let genAI = null;
let model = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    // Keep responses concise and focused
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });
}

export { model, GEMINI_API_KEY };
