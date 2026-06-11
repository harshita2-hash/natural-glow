import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { PRODUCTS } from "./src/products";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize the Google GenAI client securely on the server
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for Skincare Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid payload. 'messages' must be an array." });
      }

      const systemInstruction = `You are the friendly, expert AI Skincare Advisor for "Natural Glow" Boutique. Your role is to analyze the user's skin type (Oily, Dry, Combination, Sensitive, Normal) and skin problems or concerns (such as Acne, Dehydration, Pores, Aging, Dullness, redness, compromised barrier), and recommend the perfect skincare products from our curated catalog.

Here is our exclusive product catalog:
${JSON.stringify(PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  skinType: p.skinType,
  benefits: p.benefits,
  ingredients: p.ingredients,
  description: p.description,
  expectedResults: p.expectedResults
})), null, 2)}

Strict Guidelines:
1. Diagnose the customer's skin friendly and professionally. Offer specific, actionable skincare advice based on their skin type and skin problems.
2. Recommend ONLY real products from the catalog above. Never invent products.
3. IMPORTANT: When you recommend or mention a product, you must include its exact ID in double brackets like this: [[product-id]] (for example: [[vit-c-serum]], [[hyaluronic-serum]], [[niacinamide-serum]], [[daily-glow-moisturizer]], [[ultra-shield-sunscreen]], [[gentle-foaming-cleanser]], [[salicylic-acne-care]], [[retinol-anti-aging]]). The frontend will use these tags to render interactive, clickable product cards in the chat window so the user can easily view or add them to the cart.
4. Keep your responses concise (under 200 words per message), warm, encouraging, dermatologically sound, and structured with clean bullet points.
5. Emphasize how the ingredients (like multi-weight Hyaluronic Acid, 10% Niacinamide with Zinc PCA, and Micro-encapsulated Retinol) directly address their specific concerns.
6. Provide a simple morning (AM) and evening (PM) routine order of application.`;

      // Transform history to meet SDK expected format: { role: string, parts: [{ text: string }] }
      const contents = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content || "" }]
      }));

      const modelName = "gemini-3.5-flash";

      const result = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = result.text || "I apologize, but I couldn't formulate a recommendation at this moment. Please try again!";
      res.json({ reply });

    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Failed to query skincare advisor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
