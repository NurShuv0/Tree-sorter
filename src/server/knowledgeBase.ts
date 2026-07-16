/**
 * Local Tree Knowledge Context for Tree Sorter AI Assistant.
 * This contains localized knowledge about tree care, symptoms, pests, diseases, and tropical contexts.
 * It is injected into the Gemini API prompt context to keep answers highly relevant and grounded.
 */

export const treeKnowledgeContext = `
=============================================
LOCAL TREE-CARE & DIAGNOSTIC KNOWLEDGE BASE
=============================================

1. CORE TREE-CARE PRINCIPLES:
- Watering: Always check soil moisture before watering. Most trees prefer deep, infrequent watering rather than light, daily sprinkling. Water at the base (root zone) rather than wetting the foliage to avoid fungal disease.
- Drainage: Poor drainage leads to waterlogging and anaerobic soil conditions, which cause root rot (indicated by a sour smell, mushy brown roots, and yellowing leaves). Pots must have drainage holes, and garden beds should be sloped or raised if in waterlogging-prone areas.
- Sunlight: Match the tree to its sunlight requirements (Full Sun: 6+ hours of direct sunlight, Partial Sun: 3-6 hours, Shade: less than 3 hours or filtered light).
- Soil Quality: Loamy, organic-rich, well-draining soil is ideal for most trees. Heavy clay compacts and holds too much water; sandy soil drains too fast and loses nutrients. Enhance with organic compost.
- Fertilizer: Apply balanced, slow-release organic fertilizers or compost during the active growing season. Do not fertilize sick, stressed, or newly repotted trees, as it can burn vulnerable roots.
- Pruning: Prune during dormant or post-fruiting phases. Use sharp, sterilized shears. Remove dead, diseased, crossing, or weak branches first to improve canopy airflow.

2. COMMON LEAF SYMPTOMS & DIAGNOSES:
- Yellowing leaves (Chlorosis):
  * If on older/lower leaves first: Often Nitrogen deficiency or overwatering.
  * If on newer/upper leaves first: Often Iron deficiency or underwatering.
  * If leaves are soft and yellow: Overwatering/root rot.
  * If leaves are dry, crispy, and yellow: Underwatering or heat stress.
- Brown tips or margins: Insufficient humidity, underwatering, windburn, or salt buildup from chemical fertilizers.
- Spotting (Black/Brown/Grey spots with rings): Fungal leaf spot diseases (e.g., Anthracnose). Spread increases with wet leaves and high humidity.
- Leaf curling: Pests (aphids, mites sucking sap under leaves) or severe water stress (curling to reduce surface area).

3. COMMON PEST SYMPTOMS:
- Tiny webs on stems/under leaves: Spider mites (thrive in dry, dusty conditions).
- White cottony clusters: Mealybugs.
- Sticky, clear residue (Honeydew) & black sooty mold: Sucking insects like Aphids, Scale, or Whiteflies.
- Holes or chewed edges: Caterpillars, beetles, or leaf-cutter bees.

4. FUNGAL DISEASE WARNING SIGNS:
- Powdery white/grey coating: Powdery mildew (favors warm days and cool, damp nights).
- Orange/rust-colored pustules: Rust fungi.
- Sudden wilting of branches, dark lesions on bark, or weeping sap: Canker diseases.
- Smelly, mushy roots or sudden dieback: Phytophthora root rot.

5. NUTRIENT DEFICIENCIES:
- Nitrogen (N): Stunted growth, general yellowing starting from older leaves.
- Phosphorus (P): Purplish or dark bronze discoloration on leaf undersides, poor root development.
- Potassium (K): Yellowing/scorching of leaf margins, weak stems, poor fruit quality.

6. SAFE NON-CHEMICAL FIRST ACTIONS (FOR BEGINNERS):
- Mechanical: Physically pick off large pests (like caterpillars) or wash them away with a firm spray of water.
- Pruning: Trim and safely discard infected branches/leaves (do not compost them, to prevent spread).
- Neem Oil Spray: Mix 1 tsp organic neem oil, 1/2 tsp mild dish soap (emulsifier), and 1 liter of warm water. Spray at dusk (to avoid sun scorch) to treat aphids, mites, scale, and mild fungal issues.
- Insecticidal Soap: Dilute a mild Castile soap in water to spray sucking pests.
- Cultural Adjustments: Let soil dry, clear weeds from the tree base, apply organic mulch (keep it 2-3 inches away from the trunk to prevent rot).

7. BANGLADESH-FRIENDLY TROPICAL & SUBTROPICAL TREE CONTEXT:
- Mango (Mangifera indica): Thrives in full sun and well-drained soil. Susceptible to Anthracnose (fungal spots on leaves/fruit) and Mango Hopper pests. Reduce watering during flowering to encourage fruit set.
- Guava (Psidium guajava): Hardy, tolerates various soils but prefers well-drained loamy soil. Susceptible to Guava Wilt (fungal, causes yellowing/sudden death) and Fruit Fly. Cover fruits with paper bags to protect from fruit flies.
- Lemon (Citrus limon): Needs full sun, regular watering, and high nutrients. Susceptible to Citrus Leaf Miner (creates silvery trails in leaves) and Citrus Canker (corky bacterial spots on leaves/stems). Prune for airflow.
- Jackfruit (Artocarpus heterophyllus): Bangladesh's national tree. Prefers deep, rich, well-draining soil. Sensitive to waterlogging (will rot quickly). Susceptible to Jackfruit Borer.
- Papaya (Carica papaya): Requires excellent drainage and full sun. Highly sensitive to waterlogging and root rot. Susceptible to Papaya Mosaic Virus (spread by aphids, causes mottled leaves) and Mealybugs.
- Banana (Musa spp.): High water and nutrient feeder. Needs heavy organic matter. Susceptible to Panama Disease (Fusarium wilt) and Sigatoka Leaf Spot.
- Coconut (Cocos nucifera): High salinity tolerance, needs sandy/loamy well-drained soil and high humidity. Susceptible to Red Palm Weevil and Bud Rot.
- Moringa (Moringa oleifera): Extremely drought-tolerant, dislikes wet feet. Easy to grow from cuttings. Highly nutritious.
`;
