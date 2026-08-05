import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { treeKnowledgeContext } from './knowledgeBase';
import { DISEASE_LABELS } from '../data/plantDiseaseLabels';
import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Root welcome page & health check
app.get('/', (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tree Sorter AI API Backend</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 3rem 1.5rem; background: #0b1320; color: #f1f5f9; text-align: center; }
          .card { max-width: 540px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 1rem; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.4); }
          h1 { color: #4ade80; margin-bottom: 0.5rem; }
          p { color: #94a3b8; line-height: 1.6; }
          .btn { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #22c55e; color: #0f172a; text-decoration: none; font-weight: 600; border-radius: 0.5rem; transition: background 0.2s; }
          .btn:hover { background: #16a34a; }
          code { background: #0f172a; padding: 0.2rem 0.4rem; border-radius: 0.25rem; color: #38bdf8; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🌿 Tree Sorter AI Backend Server</h1>
          <p>This server runs the AI Chat API endpoint at <code>/api/chat</code> on port 5000.</p>
          <p>To use the full web app UI (Tree Assistant, Disease Screening, Plants, Weather), visit the Vite frontend:</p>
          <a class="btn" href="http://localhost:5173" target="_blank">Open Web App (http://localhost:5173) &rarr;</a>
        </div>
      </body>
    </html>
  `);
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', server: 'Tree Sorter Express AI Backend', port: PORT });
});

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

  // 1. Check for specific disease scan query or specific disease name match from DISEASE_LABELS
  for (const label of DISEASE_LABELS) {
    const nameLower = label.displayName.toLowerCase();
    const plantLower = label.plant.toLowerCase();
    if (query.includes(nameLower) || (query.includes(plantLower) && nameLower.split(' ').some(word => word.length > 3 && query.includes(word)))) {
      const isHealthy = label.isHealthy;
      const quick = isHealthy
        ? `Great news! The screening indicates your ${label.plant} tree appears healthy with no major disease symptoms.`
        : `Assessment for ${label.displayName} on ${label.plant}: This is a ${label.severity.toLowerCase()} ${label.scientificCategory.toLowerCase()}.`;
      
      return {
        message: `### Quick Assessment
${quick}

### Key Observations to Look For
${label.observations.map((o) => `- ${o}`).join('\n')}

### Safe Immediate Care Steps
${label.immediateSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

### Long-Term Prevention Tips
${label.preventionTips.map((p) => `- ${p}`).join('\n')}

### When to Seek Local Help
If symptoms affect more than 30% of the canopy, or if rapid branch dieback occurs, consult a local certified horticulturist or agricultural extension officer immediately.`,
        suggestedActions: label.immediateSteps.slice(0, 3).map((s) => s.split(' ').slice(0, 4).join(' ')),
        followUpQuestion: isHealthy
          ? `How long have you been cultivating this ${label.plant} tree, and are you noticing any subtle changes?`
          : `Have you observed any similar spots or lesions spreading to nearby leaves or adjacent trees?`,
      };
    }
  }

  // 2. Specific Plant Specific Guidance (Mango, Citrus, Tomato, Papaya, etc.)
  if (query.includes("mango")) {
    return {
      message: `### Quick Assessment
Mango trees (Mangifera indica) thrive in full sun and well-drained loamy soil, but are vulnerable to Anthracnose fungal spots and Mango Hoppers.

### Possible Causes
- Anthracnose fungal infection during wet flowering periods
- Nitrogen imbalance causing lush foliage at the expense of fruit
- Waterlogging around root zone causing root suffocation

### What to Check
1. Inspect flower panicles and young fruit clusters for black scab-like lesions
2. Check leaf undersides for hopper bugs or sticky honeydew
3. Test soil drainage 10 cm below the surface

### Safe Actions Now
- Reduce watering during flowering to encourage strong fruit set
- Prune dense inner branches to open the canopy center to sunlight
- Apply an organic copper-based spray before flowering if Anthracnose is recurring

### When to Seek Local Help
Consult your local agricultural office if trunk borer holes with weeping sap appear or if flower panicles drop completely.`,
      suggestedActions: ["Inspect flower panicles", "Prune canopy center", "Apply organic copper spray"],
      followUpQuestion: "Is your mango tree currently flowering, fruiting, or flushing new leaves?",
    };
  }

  if (query.includes("citrus") || query.includes("lemon") || query.includes("orange") || query.includes("lime")) {
    return {
      message: `### Quick Assessment
Citrus trees require full sun, high nitrogen & iron nutrients, well-draining soil, and protection from leaf miners and citrus greening (HLB).

### Possible Causes
- Iron or zinc chlorosis causing yellow leaves with green veins
- Citrus leaf miner larvae carving silvery serpentine tunnels in young leaves
- Phytophthora root rot from soggy or poorly drained soil

### What to Check
1. Check if yellow leaves retain green veins (micronutrient issue vs nitrogen deficiency)
2. Inspect new leaf flushes for silvery winding leaf miner trails
3. Examine the trunk base for dark weeping sap

### Safe Actions Now
- Apply a balanced citrus fertiliser containing micronutrients (Iron, Zinc, Magnesium)
- Prune for an open canopy structure to increase air circulation
- Mulch around the drip line, keeping mulch 10 cm away from the trunk bark

### When to Seek Local Help
Contact local agricultural authorities immediately if leaves show blotchy asymmetric mottle and lopsided bitter fruit (signs of regulated Citrus Greening).`,
      suggestedActions: ["Apply citrus fertiliser", "Check young leaf flushes", "Clear mulch from trunk"],
      followUpQuestion: "Are the leaf veins staying green while the rest turns yellow, or do you see silvery winding trails?",
    };
  }

  if (query.includes("tomato")) {
    return {
      message: `### Quick Assessment
Tomatoes are sensitive to moisture fluctuations and high humidity, making them prone to Early Blight, Late Blight, and Septoria leaf spot.

### Possible Causes
- Fungal spores splash-spread from soil onto lower leaves during irrigation
- High ambient humidity (above 85%) encouraging Leaf Mold or Late Blight
- Irregular watering causing Blossom End Rot or fruit cracking

### What to Check
1. Inspect lower leaves for dark brown bull's-eye target ring spots (Early Blight)
2. Check for greasy dark water-soaked patches with white undersides (Late Blight)
3. Check soil moisture consistency at 5 cm depth

### Safe Actions Now
- Stake and prune suckers to keep foliage off the ground and improve airflow
- Water strictly at the base of the plant using drip irrigation — avoid wetting leaves
- Mulch around plants to prevent soil-borne spore splashback

### When to Seek Local Help
Destroy and remove plants immediately if Late Blight (greasy black foliage) spreads rapidly to prevent field-wide loss.`,
      suggestedActions: ["Stake & prune suckers", "Switch to drip watering", "Apply organic mulch"],
      followUpQuestion: "Do the spots have concentric rings, or are they greasy dark patches on the leaves?",
    };
  }

  if (query.includes("papaya") || query.includes("guava") || query.includes("banana") || query.includes("coconut") || query.includes("jackfruit")) {
    return {
      message: `### Quick Assessment
Tropical fruit trees require deep well-draining soil, high organic matter, and protection from root rot and sucking insect vectors.

### Possible Causes
- Waterlogging causing anaerobic root rot and sudden wilting
- Sucking insects (aphids, mealybugs) vectoring viral mosaic diseases
- Nutrient leaching during heavy rainfall seasons

### What to Check
1. Test soil drainage 10–15 cm deep — soil should not feel waterlogged or sour
2. Inspect leaf undersides for white cottony mealybugs or aphid clusters
3. Check new growth for mottled yellow patterns

### Safe Actions Now
- Build raised planting beds or drainage swales to prevent standing water
- Apply organic neem oil spray (1 tsp neem oil + 1/2 tsp soap in 1L warm water) at dusk for pests
- Apply well-rotted compost around the drip zone

### When to Seek Local Help
Consult a local specialist if sudden wilting occurs while soil is wet (indicating vascular fungal wilt).`,
      suggestedActions: ["Improve root drainage", "Apply neem oil spray", "Add organic compost"],
      followUpQuestion: "Does the soil around your tree drain quickly after rain, or does water tend to pool?",
    };
  }

  // 3. Symptom & Problem Specific Categories (Yellowing, Spots, Pests, Watering, Pruning, Fertilizer/Soil)
  if (query.includes("yellow") || query.includes("chlorosis")) {
    return {
      message: `### Quick Assessment
Yellowing leaves (chlorosis) signal root oxygen starvation from overwatering, nitrogen/iron nutrient deficiencies, or soil pH imbalances.

### Possible Causes
- Overwatering causing root rot and loss of nutrient uptake ability
- Nitrogen deficiency (yellowing begins on older lower leaves first)
- Iron deficiency (yellowing begins on young top leaves while veins stay green)

### What to Check
1. Check soil moisture 5–10 cm below the surface before watering
2. Inspect root zone for foul odors or dark mushy root tips
3. Determine whether yellowing is on older bottom leaves or young top leaves

### Safe Actions Now
- Allow the top 5 cm of soil to dry completely between deep waterings
- Ensure pot drainage holes or garden bed drainage channels are unobstructed
- Apply a balanced organic fertiliser or compost tea to restore nitrogen levels

### When to Seek Local Help
Seek arborist help if yellowing is accompanied by bark decay, fungal brackets at the trunk base, or major branch dieback.`,
      suggestedActions: ["Test soil pH & drainage", "Adjust watering frequency", "Check for root rot"],
      followUpQuestion: "Did the yellowing start on the lower older leaves or the young top leaves?",
    };
  }

  if (query.includes("spot") || query.includes("fungus") || query.includes("fungal") || query.includes("black") || query.includes("brown") || query.includes("blight") || query.includes("scab")) {
    return {
      message: `### Quick Assessment
Leaf spots (black, brown, or grey lesions with yellow halos) indicate fungal or bacterial infections such as Anthracnose, Scab, or Blight.

### Possible Causes
- Fungal spores spreading via splashing water droplets or high humidity
- Poor canopy airflow retaining leaf wetness for extended periods
- Fallen infected leaves overwintering spores on the soil surface

### What to Check
1. Check for concentric rings, target spots, or yellow margins around lesions
2. Inspect leaf undersides for velvety spore masses or white powdery coating
3. Look for dark sunken cankers on adjacent twigs and stems

### Safe Actions Now
- Water strictly at the base/root zone — avoid wetting the foliage
- Prune crowded inner branches to increase sunlight penetration and air circulation
- Rake, bag, and discard fallen infected leaves — do not compost them

### When to Seek Local Help
Apply a copper-based fungicide or seek professional guidance if spots cover more than 25% of total leaf area.`,
      suggestedActions: ["Prune for airflow", "Switch to drip watering", "Clean fallen leaf litter"],
      followUpQuestion: "Are the spots small dry dots, or large spreading patches with yellow halos?",
    };
  }

  if (query.includes("pest") || query.includes("bug") || query.includes("aphid") || query.includes("scale") || query.includes("mite") || query.includes("caterpillar") || query.includes("worm") || query.includes("whitefly")) {
    return {
      message: `### Quick Assessment
Leaf damage, sticky leaf surfaces, or fine webbing indicate active garden pests like aphids, scale insects, whiteflies, or spider mites.

### Possible Causes
- Sucking insects feeding on plant sap and weakening leaf tissue
- Honeydew secretions leading to secondary black sooty mold fungus
- Hot, dry, dusty conditions favoring rapid spider mite reproduction

### What to Check
1. Check leaf undersides and tender stem tips for tiny crawling or stationary insects
2. Look for shiny sticky honeydew residue or black powdery sooty mold
3. Inspect under leaves for fine silken webbing (spider mites)

### Safe Actions Now
- Spray undersides of leaves with a firm stream of clean water to dislodge pests
- Apply organic neem oil spray (1 tsp neem oil + 1/2 tsp soap per 1L warm water) at dusk
- Encourage beneficial predatory insects such as ladybirds and lacewings

### When to Seek Local Help
Consult a nursery expert if severe stem borer holes or widespread defoliation from armyworms occurs.`,
      suggestedActions: ["Apply neem oil spray", "Wash leaf undersides", "Check for honeydew"],
      followUpQuestion: "Do you see sticky clear residue, fine silk webbing, or visible bugs under the leaves?",
    };
  }

  if (query.includes("water") || query.includes("dry") || query.includes("wilt") || query.includes("drain") || query.includes("droop")) {
    return {
      message: `### Quick Assessment
Wilting or crispy brown leaf margins indicate water stress — caused by underwatering, compact soil, or root damage from chronic overwatering.

### Possible Causes
- Shallow frequent watering encouraging weak root systems near the surface
- Compact clay soil preventing deep root penetration and water absorption
- High environmental heat and dry winds increasing transpiration demand

### What to Check
1. Push a finger or moisture meter 8–10 cm into the root zone to feel true moisture
2. Observe whether water pools on the soil surface for hours or drains quickly
3. Check leaf margins: soft wilted leaves signal root rot/overwatering; crispy margins signal underwatering

### Safe Actions Now
- Water deeply and infrequently at the outer canopy drip line, not against the trunk
- Apply a 5–8 cm layer of organic leaf or bark mulch around the root zone
- Avoid watering during hot midday sun to reduce thermal stress and evaporation

### When to Seek Local Help
Seek advice if the tree wilts continuously even when soil is visibly moist (vascular wilt disease).`,
      suggestedActions: ["Apply organic mulch", "Water deeply at drip line", "Test root zone depth"],
      followUpQuestion: "When you check 8 cm deep into the soil, does it feel bone dry or wet and heavy?",
    };
  }

  if (query.includes("prun") || query.includes("cut") || query.includes("trim") || query.includes("branch")) {
    return {
      message: `### Quick Assessment
Proper pruning removes dead wood, improves canopy sunlight and airflow, and prevents fungal diseases from establishing.

### Possible Causes
- Overcrowded canopy creating humid shade pockets ideal for fungal spores
- Crossing or rubbing branches causing open bark wounds
- Unsterilized pruning shear blades spreading pathogens between plants

### What to Check
1. Identify the 3 Ds: Dead, Diseased, and Damaged branches first
2. Check branch collar position before making any major cuts
3. Ensure pruning blades are sharp and sterilized with 70% alcohol

### Safe Actions Now
- Prune during dormant periods or immediately post-fruiting
- Make clean angled cuts (45 degrees) just outside the branch collar
- Never remove more than 25-30% of the total green canopy in a single season

### When to Seek Local Help
Hire a certified professional arborist for large tree branches, high canopy trimming, or structural hazardous limbs.`,
      suggestedActions: ["Sterilize pruning tools", "Remove dead wood first", "Cut outside branch collar"],
      followUpQuestion: "What species of tree are you trimming, and is it currently flowering or dormant?",
    };
  }

  if (query.includes("fertiliz") || query.includes("soil") || query.includes("compost") || query.includes("nutrient") || query.includes("feed")) {
    return {
      message: `### Quick Assessment
Healthy trees require balanced macro-nutrients (N-P-K) and micro-nutrients in well-draining, organic-rich soil with a pH between 6.0 and 7.0.

### Possible Causes
- Nitrogen (N) deficiency causing overall pale green/yellow foliage and stunted growth
- Phosphorus (P) deficiency causing purplish leaf undersides and poor root growth
- Potassium (K) deficiency causing leaf tip browning and weak disease resistance

### What to Check
1. Test soil pH using a simple nursery test kit
2. Check soil texture — ideal soil is crumbly, loamy, and rich in humus
3. Ensure fertilizer is not applied directly against the main trunk base

### Safe Actions Now
- Top-dress the root zone with well-aged organic compost or vermicompost
- Apply balanced slow-release organic fertilizer during the active growing season
- Avoid fertilizing sick, stressed, or newly transplanted trees to prevent root burn

### When to Seek Local Help
Conduct a formal laboratory soil test if persistent multi-nutrient chlorosis occurs despite composting.`,
      suggestedActions: ["Test soil pH", "Add organic compost", "Apply slow-release feed"],
      followUpQuestion: "Have you recently added fertilizer, and what type of soil (clay, sand, loam) do you have?",
    };
  }

  // 4. Default Intelligent General Response (Grounded in Tree Care Knowledge)
  return {
    message: `### Quick Assessment
Welcome to Tree Sorter AI! I am ready to help you diagnose plant health, disease symptoms, watering schedules, pruning rules, or soil quality.

### Key Gardening Guidelines
- **Watering**: Water deeply at the root zone (drip line) rather than sprinkling foliage to prevent fungal leaf spots.
- **Sunlight**: Most fruit and garden trees require 6+ hours of direct sun daily.
- **Airflow**: Prune overcrowded inner branches to allow light and breeze to dry wet leaves.
- **Soil & Mulch**: Use well-draining loamy soil and keep 5 cm of mulch around the drip zone (clear of trunk bark).

### What You Can Ask Me
- *"Why are my lemon tree leaves turning yellow?"*
- *"How do I treat black spots on my mango leaves?"*
- *"What should I do after my disease scan detected Early Blight?"*
- *"How often should I water papaya trees in summer?"*

### Safe Immediate Actions
- Inspect both upper and lower leaf surfaces for spots or pests.
- Check soil moisture 5 cm deep before watering.
- Rake and destroy fallen diseased leaves.`,
    suggestedActions: ["Diagnose yellow leaves", "Treat leaf spots", "Tree watering guide"],
    followUpQuestion: "What tree species or plant symptom would you like to investigate today?",
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

    if (provider === 'groq') {
      // ----------------------------------------
      // GROQ PROVIDER (Free — llama3 via Groq)
      // ----------------------------------------
      const groqKey = process.env.GROQ_API_KEY;
      if (!groqKey) {
        console.warn('[Groq] GROQ_API_KEY missing. Falling back to local knowledge engine.');
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({ success: true, message: fallback.message, suggestedActions: fallback.suggestedActions, followUpQuestion: fallback.followUpQuestion });
        return;
      }
      const groq = new Groq({ apiKey: groqKey });
      const groqMessages = [
        { role: 'system' as const, content: getSystemInstruction() + '\n\nIMPORTANT: You MUST respond ONLY with valid JSON in this exact format, with NO extra text outside the JSON:\n{"message": "your response here", "suggestedActions": ["action1", "action2", "action3"], "followUpQuestion": "your follow up question here"}' },
        ...trimmedHistory.map((msg) => ({ role: msg.role === 'assistant' ? 'assistant' as const : 'user' as const, content: msg.content })),
        { role: 'user' as const, content: trimmedMessage },
      ];
      try {
        console.log('[Groq] Sending request to llama-3.3-70b-versatile...');
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 1024,
          response_format: { type: 'json_object' },
        });
        const rawText = completion.choices[0]?.message?.content || '';
        try {
          const parsed = JSON.parse(cleanJsonResponse(rawText));
          console.log('[Groq] ✅ Live AI response received successfully.');
          res.json({ success: true, message: parsed.message || rawText, suggestedActions: parsed.suggestedActions || [], followUpQuestion: parsed.followUpQuestion || '' });
        } catch {
          res.json({ success: true, message: rawText, suggestedActions: ['Check soil moisture', 'Inspect leaves', 'Review watering'], followUpQuestion: 'What other symptoms are visible on your plant?' });
        }
      } catch (groqErr: any) {
        console.warn('[Groq Error] Falling back to local engine:', groqErr?.message);
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({ success: true, message: fallback.message, suggestedActions: fallback.suggestedActions, followUpQuestion: fallback.followUpQuestion });
      }

    } else if (provider === 'ollama') {
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
      // GEMINI PROVIDER (Official SDK)
      // ----------------------------------------
      const apiKey = process.env.GEMINI_API_KEY;

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

      console.log('[Gemini] Initiating @google/genai SDK request...');

      // Use the new unified @google/genai SDK — supports AQ. keys from Google AI Studio natively
      const ai = new GoogleGenAI({ apiKey });

      // Build full conversation contents including system instruction
      const contents = [
        ...trimmedHistory.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
          parts: [{ text: msg.content }],
        })),
        { role: 'user' as const, parts: [{ text: trimmedMessage }] },
      ];

      let sdkResponse;
      try {
        sdkResponse = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents,
          config: {
            systemInstruction: getSystemInstruction(),
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'object' as any,
              properties: {
                message: { type: 'string' as any, description: 'Detailed plant health response with assessment, causes, and care steps.' },
                suggestedActions: { type: 'array' as any, items: { type: 'string' as any }, description: '2-3 short action chips.' },
                followUpQuestion: { type: 'string' as any, description: 'One focused follow-up question.' },
              },
              required: ['message', 'suggestedActions', 'followUpQuestion'],
            },
          },
        });
      } catch (sdkErr: any) {
        console.warn('[Gemini SDK Error] Falling back to local knowledge engine:', sdkErr?.message);
        const fallback = generateLocalKnowledgeResponse(trimmedMessage, trimmedHistory);
        res.json({
          success: true,
          message: fallback.message,
          suggestedActions: fallback.suggestedActions,
          followUpQuestion: fallback.followUpQuestion,
        });
        return;
      }

      const responseText = sdkResponse.text;

      if (!responseText) {
        console.warn('[Gemini] Empty SDK response. Falling back to local knowledge engine.');
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
        console.log('[Gemini] ✅ Live AI response received successfully.');
        res.json({
          success: true,
          message: parsed.message || responseText,
          suggestedActions: parsed.suggestedActions || [],
          followUpQuestion: parsed.followUpQuestion || '',
        });
      } catch (parseErr) {
        console.warn('[Gemini JSON Parse] Returning raw text response.');
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
