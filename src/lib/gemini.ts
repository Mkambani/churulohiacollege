import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({ apiKey });

export const chatModel = "gemini-3-flash-preview";

export async function sendMessage(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = []) {
  const chat = ai.chats.create({
    model: chatModel,
    config: {
      systemInstruction: "You are a helpful, creative, and professional AI assistant. You provide concise and accurate information.",
    },
  });

  // Reconstruct history if needed, but for simplicity in this starter we'll just send the message
  // In a real app, you'd pass history to ai.chats.create
  
  const response = await chat.sendMessage({ message });
  return response.text;
}
