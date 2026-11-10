# Gemini AI Setup for Chat Bot

Your chat bot is now powered by **Google Gemini AI** — a real LLM that understands natural language and generates smart responses.

## Current Status

Without an API key, the chat bot falls back to **keyword matching** (the old system). To unlock the full AI brain, you need a free Gemini API key.

## Get Your Free API Key (5 minutes)

1. Go to [**Google AI Studio**](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key (it looks like: `AIzaSy...`)

## Configure Your Chat Bot

1. Open `Portfolio/src/config/gemini.js`
2. Paste your API key on line 12:
   ```js
   const GEMINI_API_KEY = "AIzaSy...your-key-here...";
   ```
3. Save the file

That's it! The chat bot will automatically use Gemini AI.

## What Changes

| Without API Key | With API Key |
|---|---|
| Keyword matching | Real AI understanding |
| Pre-written answers | Natural generated responses |
| Fails on unexpected questions | Handles any question style |
| Returns wrong answers sometimes | Context-aware and accurate |

## Cost

**Free.** Google Gemini free tier includes:
- 60 requests per minute
- 1,500 requests per day
- This is more than enough for a portfolio chat bot

## Security Note

The API key is stored in your source code. For a personal portfolio, this is acceptable. If you want to hide it in production, you can move it to a Vercel environment variable and use a simple API route proxy.
