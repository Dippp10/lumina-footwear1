
import { GoogleGenAI, Type } from "@google/genai";
import { SHOE_CATALOG } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "Lumina Style Concierge", a high-end fashion expert specializing in footwear.
Your goal is to help users find the perfect pair of shoes from the LUMINA collection.

Our current catalog:
${JSON.stringify(SHOE_CATALOG, null, 2)}

Instructions:
1. Be polite, sophisticated, and encouraging.
2. Analyze the user's request (outfit, occasion, or style preference).
3. Recommend 1 or 2 specific shoes from the catalog.
4. Explain WHY they match (e.g., "The Midnight Oxford's polished finish complements your navy suit perfectly").
5. Keep responses concise but elegant.
6. If the user asks for something we don't have, recommend the closest alternative from our collection.
`;

export async function getStyleAdvice(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, my creative senses are currently resting. How else may I assist you with our collection?";
  }
}

export async function analyzeOutfitImage(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: "Analyze this outfit and recommend the perfect pair of shoes from our LUMINA collection. Describe why they match." }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    return "I couldn't quite see the outfit clearly. Could you describe it to me?";
  }
}
