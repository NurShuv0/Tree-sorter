import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { treeKnowledgeContext } from './knowledgeBase';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

// System instructions for the model, combining user requirements and the local knowledge base
const getSystemInstruction = (): string => {
  return `You are Tree Sorter’s helpful AI gardening assistant. Help users understand trees, plant care, common diseases, pest issues, and safe garden practices. Give practical, calm, beginner-friendly guidance.

Always:
* Ask one or two focused follow-up questions when the tree type, location, symptoms, weather, watering pattern, soil condition, or photo is missing.
* Clearly separate likely causes from confirmed facts.
* Provide a short action plan with safe steps the user can try.
* Mention urgency when symptoms suggest severe stress, rapid decline, pests, root rot, dangerous tree instability, or possible toxicity.
* Do not claim certainty about disease identification without adequate evidence.
* Do not give dangerous chemical dosage instructions.
* Encourage local professional help for major disease, structural risk, large trees, or fast deterioration.
* Use concise readable paragraphs and clear numbered recommendations.
* Keep the tone warm, reassuring, intelligent, and practical.

---------------------------------------------
LOCAL TREE KNOWLEDGE CONTEXT:
${treeKnowledgeContext}
---------------------------------------------

RESPONSE FORMAT REQUIREMENTS:
You MUST output your response in JSON format matching the following structure:
{
  "message": "Write the main response here. Ensure it contains the following sections:
- Quick assessment (1-2 sentences)
- Possible causes (bulleted or numbered points)
- What to check (numbered list of items to inspect)
- Safe actions now (bulleted list of safe steps)
- When to seek local help (guidelines for professional advice)
Use clean paragraphs and Markdown formatting.",
  "suggestedActions": ["Action chip 1", "Action chip 2", "Action chip 3"],
  "followUpQuestion": "One single focused follow-up question here."
}
`;
};

app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body as ChatRequestBody;

    // 1. Validation
    if (!message || typeof message !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid message. Message is required and must be a string.',
      });
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      res.status(400).json({
        success: false,
        message: 'Message content cannot be empty.',
      });
      return;
    }

    if (trimmedMessage.length > 2000) {
      res.status(400).json({
        success: false,
        message: 'Message exceeds the maximum length of 2000 characters.',
      });
      return;
    }

    // 2. Select AI Provider
    const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
    
    // Trim message history
    const rawHistory = Array.isArray(history) ? history : [];
    const maxHistoryCount = 12;
    const trimmedHistory = rawHistory.slice(-maxHistoryCount);

    if (provider === 'ollama') {
      // ----------------------------------------
      // OLLAMA PROVIDER (Local LLM Server)
      // ----------------------------------------
      const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
      const model = process.env.OLLAMA_MODEL || 'llama3';
      const timeoutMs = parseInt(process.env.AI_TIMEOUT_MS || '300000', 10); // Default 5 minutes for local models

      console.log(`[Ollama] Dispatching request to ${host} using model ${model}...`);

      const ollamaMessages = [
        { role: 'system', content: getSystemInstruction() },
        ...trimmedHistory.map((msg) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        })),
        { role: 'user', content: trimmedMessage },
      ];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const endpointUrl = `${host}/api/chat`;
      const ollamaPayload = {
        model,
        messages: ollamaMessages,
        stream: false,
        format: 'json',
      };

      let response;
      try {
        response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ollamaPayload),
          signal: controller.signal,
        });
      } catch (fetchErr: any) {
        if (fetchErr.name === 'AbortError') {
          throw new Error(`Timeout: Ollama request took longer than ${timeoutMs}ms.`);
        }
        throw fetchErr;
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Ollama server returned status code ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const responseText = data.message?.content;

      if (!responseText) {
        throw new Error('Ollama returned empty or missing message content structure.');
      }

      const parsed = JSON.parse(responseText);
      res.json({
        success: true,
        message: parsed.message,
        suggestedActions: parsed.suggestedActions || [],
        followUpQuestion: parsed.followUpQuestion || '',
      });

    } else {
      // ----------------------------------------
      // GEMINI PROVIDER (Cloud API)
      // ----------------------------------------
      const apiKey = process.env.GEMINI_API_KEY;
      const timeoutMs = parseInt(process.env.AI_TIMEOUT_MS || '15000', 10); // Default 15s for Gemini

      if (!apiKey) {
        console.error('API Error: GEMINI_API_KEY is not configured in backend environment.');
        res.status(500).json({
          success: false,
          message: 'I could not reach the Tree Sorter assistant right now. Please check your connection and try again.',
        });
        return;
      }

      // Map history to model roles ('user' | 'model')
      const contents = trimmedHistory.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      contents.push({
        role: 'user',
        parts: [{ text: trimmedMessage }],
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

      const geminiPayload = {
        contents,
        systemInstruction: {
          parts: [{ text: getSystemInstruction() }],
        },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              message: {
                type: 'STRING',
                description: 'The natural assistant response containing the assessment, possible causes, what to check, safe actions, and when to seek help, using concise paragraphs and clear numbered lists.',
              },
              suggestedActions: {
                type: 'ARRAY',
                items: { type: 'STRING' },
                description: '2-3 short, specific action chips the user can click next.',
              },
              followUpQuestion: {
                type: 'STRING',
                description: 'One focused follow-up question for the user.',
              },
            },
            required: ['message', 'suggestedActions', 'followUpQuestion'],
          },
        },
      };

      let response;
      try {
        response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(geminiPayload),
          signal: controller.signal,
        });
      } catch (fetchErr: any) {
        if (fetchErr.name === 'AbortError') {
          throw new Error(`Timeout: Gemini request took longer than ${timeoutMs}ms.`);
        }
        throw fetchErr;
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini API returned status code ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error('Gemini API returned an empty or invalid candidate structure.');
      }

      const parsed = JSON.parse(responseText);
      res.json({
        success: true,
        message: parsed.message,
        suggestedActions: parsed.suggestedActions || [],
        followUpQuestion: parsed.followUpQuestion || '',
      });
    }
  } catch (error) {
    console.error('Error handling chat API request:', error);
    res.status(500).json({
      success: false,
      message: 'I could not reach the Tree Sorter assistant right now. Please check your connection and try again.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Tree Sorter Backend] Server running on http://localhost:${PORT}`);
});
