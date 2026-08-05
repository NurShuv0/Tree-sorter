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

export function cleanJsonResponse(text: string): string {
  return text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/\s*```$/, '')
    .trim();
}

export function generateLocalKnowledgeResponse(message: string, history?: ChatMessage[]): {
  message: string;
  suggestedActions: string[];
  followUpQuestion: string;
} {
  const query = message.toLowerCase();

  let quickAssessment = "Based on your tree care inquiry, here is guidance grounded in local horticulture knowledge.";
  const possibleCauses: string[] = [
    "Environmental stress (watering, lighting, or temperature shifts)",
    "Soil nutrient imbalances or drainage restrictions",
    "Early stage fungal spore or garden pest activity"
  ];
  const whatToCheck: string[] = [
    "Check soil moisture 5–10 cm deep around the drip line",
    "Inspect both upper and lower leaf surfaces for spots or pests",
    "Examine trunk and stems for bark cracks, sap weeping, or rot"
  ];
  const safeActions: string[] = [
    "Maintain consistent deep watering at the root zone",
    "Ensure generous canopy spacing for sunlight and air circulation",
    "Clear fallen leaf litter around the tree base"
  ];
  let whenSeekHelp = "Seek a local certified arborist or agricultural extension officer if symptoms spread rapidly across multiple branches, or if structural wood rot is observed.";
  let followUp = "What specific tree species are you growing, and what weather or watering patterns have you had recently?";
  let suggestedActions = ["Check soil moisture", "Inspect leaf undersides", "Review watering schedule"];

  if (query.includes("yellow") || query.includes("chlorosis")) {
    quickAssessment = "Yellowing leaves (chlorosis) usually indicate overwatering, nitrogen/iron nutrient deficiency, or root stress.";
    possibleCauses.length = 0;
    possibleCauses.push("Overwatering leading to root oxygen starvation", "Nitrogen or iron deficiency in soil", "Poor soil drainage or root compaction");
    whatToCheck.length = 0;
    whatToCheck.push("Check soil moisture 5–10 cm below the surface", "Inspect root zone for foul smell or dark mushy roots", "Observe whether yellowing starts on older (bottom) or new (top) leaves");
    safeActions.length = 0;
    safeActions.push("Allow soil to dry out between deep waterings", "Ensure drainage holes or swales are unblocked", "Apply a balanced organic fertiliser or compost tea");
    suggestedActions = ["Test soil pH & drainage", "Adjust watering frequency", "Check for root rot"];
    followUp = "Are the lower older leaves turning yellow first, or the young top leaves?";
  } else if (query.includes("spot") || query.includes("fungus") || query.includes("fungal") || query.includes("black") || query.includes("brown")) {
    quickAssessment = "Leaf spots (black, brown, or grey rings) are typically caused by fungal pathogens such as Anthracnose or Leaf Spot.";
    possibleCauses.length = 0;
    possibleCauses.push("Fungal spore spread via overhead watering or high humidity", "Poor air circulation in dense canopy", "Fallen infected leaves spreading inoculum");
    whatToCheck.length = 0;
    whatToCheck.push("Check for concentric rings or yellow halos around leaf spots", "Inspect leaf undersides for velvety fungal spores", "Examine nearby twigs for dark sunken cankers");
    safeActions.length = 0;
    safeActions.push("Water at the root base — avoid wetting foliage", "Prune crowded inner branches to improve airflow", "Rake and destroy fallen infected leaves immediately");
    suggestedActions = ["Prune for airflow", "Switch to drip watering", "Clean fallen leaf litter"];
    followUp = "Do the spots have yellow halos or powdery growth on the undersides of leaves?";
  } else if (query.includes("pest") || query.includes("bug") || query.includes("aphid") || query.includes("scale") || query.includes("mite")) {
    quickAssessment = "Visible leaf damage or sticky residue often signals garden pests like aphids, scale insects, or spider mites.";
    possibleCauses.length = 0;
    possibleCauses.push("Sucking insects feeding on plant sap", "Secondary sooty mold growing on sticky honeydew secretions", "Hot dry conditions favoring spider mite multiplication");
    whatToCheck.length = 0;
    whatToCheck.push("Check undersides of leaves and leaf joints for tiny insects", "Look for sticky honeydew or black sooty mold on foliage", "Inspect for fine silken webs under leaves");
    safeActions.length = 0;
    safeActions.push("Spray undersides of leaves with a strong jet of clean water", "Apply organic insecticidal soap or neem oil spray in late afternoon", "Encourage natural predators like ladybirds and lacewings");
    suggestedActions = ["Apply neem oil spray", "Wash leaf undersides", "Check for sooty mold"];
    followUp = "Do you see sticky residue, fine webbing, or visible bugs on the leaf undersides?";
  } else if (query.includes("water") || query.includes("dry") || query.includes("wilt") || query.includes("drain")) {
    quickAssessment = "Wilting or dry leaf margins indicate water stress — either underwatering or root damage from severe overwatering.";
    possibleCauses.length = 0;
    possibleCauses.push("Infrequent deep watering resulting in shallow root growth", "Compact clay soil preventing deep water penetration", "High environmental heat and evaporation");
    whatToCheck.length = 0;
    whatToCheck.push("Push a finger or moisture meter 8–10 cm into the root zone", "Check if water pools on the soil surface for long periods", "Examine leaf tips for crispy brown margins");
    safeActions.length = 0;
    safeActions.push("Water deeply and infrequently at the drip line, not the trunk", "Apply a 5–8 cm layer of organic mulch around the root zone", "Avoid watering during midday heat to reduce evaporation");
    suggestedActions = ["Apply organic mulch", "Water deeply at drip line", "Check root zone depth"];
    followUp = "How often do you water, and does water drain quickly or pool around the base?";
  } else if (query.includes("prun") || query.includes("cut") || query.includes("trim")) {
    quickAssessment = "Proper pruning maintains tree health, canopy airflow, and productivity while preventing fungal infection.";
    possibleCauses.length = 0;
    possibleCauses.push("Overcrowded canopy blocking light", "Dead or crossing branches rubbing against each other", "Unsanitized pruning tools spreading plant diseases");
    whatToCheck.length = 0;
    whatToCheck.push("Identify the 3 Ds: Dead, Diseased, and Damaged branches", "Check branch collar position before making cuts", "Ensure pruning shears are sharp and clean");
    safeActions.length = 0;
    safeActions.push("Prune during dormant or post-fruiting phases", "Sterilize tool blades with 70% alcohol or 10% bleach between cuts", "Cut just outside the branch collar at a 45-degree angle");
    suggestedActions = ["Sterilize pruning tools", "Remove dead wood first", "Prune outside branch collar"];
    followUp = "What type of tree are you pruning, and what is its current growth phase?";
  } else if (query.includes("mango")) {
    quickAssessment = "Mango trees thrive in warm climates with well-draining soil but are vulnerable to Anthracnose and Powdery Mildew.";
    possibleCauses.length = 0;
    possibleCauses.push("Anthracnose fungal attack during wet flowering season", "Nutrient imbalances (excess nitrogen reduces fruit set)", "Fruit fly or stem borer pressure");
    whatToCheck.length = 0;
    whatToCheck.push("Inspect flower panicles and young fruits for black spots", "Check trunk for sap weeping or borer holes", "Observe leaf color and flush vigor");
    safeActions.length = 0;
    safeActions.push("Protect flowers from overhead rain or wetting", "Apply copper-based organic spray before flowering if anthracnose is endemic", "Prune inner branches to open the canopy center to sunlight");
    suggestedActions = ["Inspect flower panicles", "Prune canopy center", "Apply copper spray"];
    followUp = "Is your mango tree currently flowering, fruiting, or producing new leaf flushes?";
  } else if (query.includes("citrus") || query.includes("lemon") || query.includes("orange") || query.includes("lime")) {
    quickAssessment = "Citrus trees require full sun, high nitrogen & iron, well-draining soil, and protection from leaf miners and citrus greening.";
    possibleCauses.length = 0;
    possibleCauses.push("Iron or zinc chlorosis causing yellow leaves with green veins", "Citrus leaf miner creating silvery serpentine leaf trails", "Overwatering causing Phytophthora root rot");
    whatToCheck.length = 0;
    whatToCheck.push("Check if yellow leaves have prominent green veins (micronutrient issue)", "Inspect young leaves for silvery winding trails", "Examine trunk base for weeping dark sap");
    safeActions.length = 0;
    safeActions.push("Apply citrus-specific fertilizer with trace elements (iron, zinc, magnesium)", "Mulch base leaving 10 cm clear around trunk bark", "Allow top 5 cm of soil to dry before watering again");
    suggestedActions = ["Apply citrus fertiliser", "Inspect young leaves", "Clear mulch from trunk"];
    followUp = "Are the leaf veins staying green while the leaf turns yellow, or are there serpentine trails?";
  }

  const messageMarkdown = `### Quick Assessment
${quickAssessment}

### Possible Causes
${possibleCauses.map((c) => `- ${c}`).join('\n')}

### What to Check
${whatToCheck.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

### Safe Actions Now
${safeActions.map((a) => `- ${a}`).join('\n')}

### When to Seek Local Help
${whenSeekHelp}`;

  return {
    message: messageMarkdown,
    suggestedActions,
    followUpQuestion: followUp,
  };
}

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
      const timeoutMs = parseInt(process.env.AI_TIMEOUT_MS || '300000', 10);

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
        clearTimeout(timeoutId);
        console.warn('[Ollama API Error] Falling back to local knowledge engine:', fetchErr?.message);
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`[Ollama server HTTP ${response.status}] Falling back to local knowledge engine:`, errText);
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }

      const data = await response.json();
      const responseText = data.message?.content;

      if (!responseText) {
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }

      try {
        const cleaned = cleanJsonResponse(responseText);
        const parsed = JSON.parse(cleaned);
        res.json({
          success: true,
          message: parsed.message,
          suggestedActions: parsed.suggestedActions || [],
          followUpQuestion: parsed.followUpQuestion || '',
        });
      } catch (parseErr) {
        console.warn('[Ollama JSON Parse Error] Using responseText directly or fallback');
        res.json({
          success: true,
          message: responseText,
          suggestedActions: ['Check soil moisture', 'Inspect leaves', 'Review watering'],
          followUpQuestion: 'What other symptoms are visible on your plant?',
        });
      }

    } else {
      // ----------------------------------------
      // GEMINI PROVIDER (Cloud API)
      // ----------------------------------------
      const apiKey = process.env.GEMINI_API_KEY;
      const timeoutMs = parseInt(process.env.AI_TIMEOUT_MS || '15000', 10);

      if (!apiKey) {
        console.warn('[Gemini] GEMINI_API_KEY missing. Falling back to local knowledge engine.');
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
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

      const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
        clearTimeout(timeoutId);
        console.warn('[Gemini API Fetch Error] Falling back to local knowledge engine:', fetchErr?.message);
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`[Gemini HTTP ${response.status}] Rate-limited or error. Serving local knowledge response. Details:`, errText);
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        console.warn('[Gemini] Empty candidate response. Falling back to local knowledge engine.');
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }

      try {
        const cleaned = cleanJsonResponse(responseText);
        const parsed = JSON.parse(cleaned);
        res.json({
          success: true,
          message: parsed.message,
          suggestedActions: parsed.suggestedActions || [],
          followUpQuestion: parsed.followUpQuestion || '',
        });
      } catch (parseErr) {
        console.warn('[Gemini JSON Parse Error] Serving clean response or fallback');
        res.json({
          success: true,
          message: responseText,
          suggestedActions: ['Check soil moisture', 'Inspect leaves', 'Review watering'],
          followUpQuestion: 'What other symptoms are visible on your plant?',
        });
      }
    }
  } catch (error: any) {
    console.error('[Chat API Error]', error?.message ?? error);
    try {
      const fallback = generateLocalKnowledgeResponse(req.body?.message || 'help');
      res.json({
        success: true,
        message: fallback.message,
        suggestedActions: fallback.suggestedActions,
        followUpQuestion: fallback.followUpQuestion,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'I could not reach the Tree Sorter assistant right now. Please check your connection and try again.',
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`[Tree Sorter Backend] Server running on http://localhost:${PORT}`);
});
