
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getMenuSuggestions(eventType: string, guestCount: number, language: 'en' | 'hi') {
    try {
      const prompt = `Suggest a 5-item catering menu for a ${eventType} in Uttarakhand with ${guestCount} guests. Provide the output in ${language === 'hi' ? 'Hindi' : 'English'}. Include at least one local Pahadi dish.`;
      
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      return response.text || "Unable to generate suggestions at this time.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Service currently unavailable.";
    }
  }
}

export const geminiService = new GeminiService();
