
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("The API_KEY environment variable is not set. Please set it to a valid Google Gemini API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `Generate a single, mind-blowing, and concise physics fact. 
The fact should be easy for a layperson to understand but still scientifically accurate and intriguing. 
Present only the fact itself, without any introductory phrases like "Here's a fact:" or any conversational filler.
The fact should be a complete sentence or two.`;

export async function generatePhysicsFact(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: PROMPT,
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("No content was returned from the API.");
    }

    return text.trim();
  } catch (error) {
    console.error("Error generating physics fact:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate fact from AI service: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
}
