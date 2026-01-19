import { GoogleGenAI, Type } from "@google/genai";
import { Camp, Victim } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper to check if API key is present
const isApiKeyAvailable = (): boolean => !!process.env.API_KEY;

export const predictResources = async (camp: Camp): Promise<any> => {
  if (!isApiKeyAvailable()) {
    return {
      campId: camp.id,
      predictions: [
        { item: "Water Bottles", suggestedQuantity: camp.occupancy * 3, reasoning: "Standard daily requirement (Mock)" },
        { item: "Food Rations", suggestedQuantity: camp.occupancy * 2, reasoning: "2 meals per person (Mock)" }
      ]
    };
  }

  try {
    const prompt = `
      Analyze the resource needs for a disaster relief camp with the following details:
      Camp Name: ${camp.name}
      Current Occupancy: ${camp.occupancy} people
      Max Capacity: ${camp.capacity}
      Current Resources: ${JSON.stringify(camp.resources)}

      Predict the immediate resource requirements for the next 24 hours. Focus on essentials (Food, Water, Medical, Hygiene).
      Return a JSON object.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  suggestedQuantity: { type: Type.INTEGER },
                  reasoning: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Prediction Error:", error);
    throw error;
  }
};

export const generateSituationReport = async (camps: Camp[], victims: Victim[]): Promise<string> => {
  if (!isApiKeyAvailable()) return "AI Situation Report unavailable (Missing API Key).";

  try {
    const totalVictims = victims.length;
    const totalCapacity = camps.reduce((acc, c) => acc + c.capacity, 0);
    const totalOccupancy = camps.reduce((acc, c) => acc + c.occupancy, 0);

    const prompt = `
      Generate a concise, professional disaster relief situation report for authorities.
      Data:
      - Total Registered Victims: ${totalVictims}
      - Total Camp Capacity: ${totalCapacity}
      - Total Occupancy: ${totalOccupancy}
      - Active Camps: ${camps.length}
      
      Highlight critical areas, occupancy pressure, and general stability. Keep it under 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("AI Report Error:", error);
    return "Failed to generate report.";
  }
};