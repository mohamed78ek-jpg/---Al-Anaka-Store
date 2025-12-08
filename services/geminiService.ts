import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Product } from '../types';
import { APP_CURRENCY } from '../constants';

let ai: GoogleGenAI;

const getAI = () => {
    if (!ai) {
        // @ts-ignore
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

export interface ChatSession {
    sendMessage: (msg: string) => Promise<string>;
}

export const createFashionAssistant = (products: Product[]): ChatSession => {
    const client = getAI();
    
    // Format product list for the system instruction
    const productContext = products.map(p => 
        `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: ${p.price} ${APP_CURRENCY} | Description: ${p.description} | Sizes: ${p.sizes ? p.sizes.join(',') : 'N/A'}`
    ).join('\n');

    const systemInstruction = `You are 'Lok', the AI Fashion Assistant for the 'Bazzr lok' clothing store.
    
    STORE INVENTORY:
    ${productContext}
    
    YOUR GUIDELINES:
    1. Role: Act as a trendy, helpful, and polite fashion stylist.
    2. Recommendations: STRICTLY recommend products from the provided INVENTORY. Do not hallucinate products.
    3. Styling: Suggest outfit combinations using our items (e.g., "This shirt matches perfectly with [Pant Name]").
    4. Unavailable Items: If a user asks for something we don't have, politely say so and suggest the closest alternative from our inventory.
    5. Language: Always reply in the same language as the user (Arabic or English).
    6. Tone: Use emojis occasionally to be friendly (e.g., 👗, ✨, 🛍️).
    7. Brevity: Keep responses concise and easy to read on a mobile device.
    `;

    const chat: Chat = client.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
        },
    });

    return {
        sendMessage: async (msg: string) => {
            try {
                const response: GenerateContentResponse = await chat.sendMessage({ message: msg });
                return response.text || "Sorry, I couldn't generate a response.";
            } catch (error) {
                console.error("AI Error:", error);
                return "عذراً، واجهت مشكلة في الاتصال. هل يمكنك المحاولة مرة أخرى؟";
            }
        }
    };
};
