/**
 * Plant Disease Label Map
 *
 * The TFLite model outputs 153 raw class indices covering the same 38 canonical
 * diseases repeated across train/valid splits and case-variant folder names:
 *   - Indices  0-37:  train, uppercase prefix
 *   - Indices 38-75:  valid, uppercase prefix
 *   - Indices 76-113: train, lowercase prefix
 *   - Indices 114-151:valid, lowercase prefix
 *   - Index  152:     test/noise — treated as "Unknown"
 *
 * Decode: canonicalIndex = rawIndex % 38  (for raw indices 0-151)
 */

export type Severity = 'Healthy' | 'Mild' | 'Moderate' | 'Severe';

export interface DiseaseLabel {
  /** Short human-readable disease name */
  displayName: string;
  /** Host plant name */
  plant: string;
  /** True when the plant is detected as healthy */
  isHealthy: boolean;
  severity: Severity;
  /** Pathogen / cause category */
  scientificCategory: string;
  /** Visual symptoms to look for */
  observations: string[];
  /** Immediate care actions */
  immediateSteps: string[];
  /** Long-term prevention tips */
  preventionTips: string[];
  /** Other conditions that could present similarly */
  alternateConditions: string[];
}

/** 38 canonical disease labels indexed 0-37. */
export const DISEASE_LABELS: DiseaseLabel[] = [
  // 0 - Apple Scab
  {
    displayName: 'Apple Scab',
    plant: 'Apple',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Venturia inaequalis)',
    observations: ['Olive-green to brown scab-like lesions on leaves', 'Velvety fungal growth on leaf undersides', 'Deformed or cracked fruit surface'],
    immediateSteps: ['Remove and destroy all fallen infected leaves', 'Apply a copper-based or sulfur fungicide', 'Prune to improve canopy airflow', 'Avoid overhead irrigation'],
    preventionTips: ['Plant scab-resistant apple varieties', 'Rake and compost leaf litter in autumn', 'Apply dormant-season lime sulfur spray'],
    alternateConditions: ['Cedar Apple Rust', 'Sooty Blotch', 'Flyspeck'],
  },
  // 1 - Apple Black Rot
  {
    displayName: 'Apple Black Rot',
    plant: 'Apple',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Fungal infection (Botryosphaeria obtusa)',
    observations: ['Purple or brown circular leaf spots with frog-eye pattern', 'Rotting mummified fruits on the tree', 'Cankers with reddish-brown margins on branches'],
    immediateSteps: ['Prune out infected branches at least 10 cm below canker edge', 'Remove mummified fruits immediately', 'Apply thiophanate-methyl or captan fungicide', 'Disinfect pruning tools between cuts'],
    preventionTips: ['Clear all dead wood and debris from the orchard floor', 'Ensure good canopy airflow through annual pruning', 'Monitor for fire blight which weakens trees to black rot'],
    alternateConditions: ['Apple Scab', 'Fire Blight', 'Bitter Rot'],
  },
  // 2 - Apple Cedar Rust
  {
    displayName: 'Cedar Apple Rust',
    plant: 'Apple',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Gymnosporangium juniperi-virginianae)',
    observations: ['Bright orange-yellow spots on upper leaf surface', 'Orange tube-like spore tubes on leaf undersides', 'Lesions may also appear on fruit and twigs'],
    immediateSteps: ['Apply myclobutanil or mancozeb fungicide during bloom', 'Remove nearby juniper/cedar trees if feasible', 'Pick off heavily infected leaves to reduce spore load'],
    preventionTips: ['Plant rust-resistant apple cultivars', 'Remove galls from juniper hosts before spring', 'Maintain a 100m buffer from juniper plantings'],
    alternateConditions: ['Apple Scab', 'Powdery Mildew', 'Quince Rust'],
  },
  // 3 - Apple Healthy
  {
    displayName: 'Healthy Apple',
    plant: 'Apple',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Vibrant green foliage with no lesions', 'Smooth, unblemished leaf surface', 'Normal fruit development visible'],
    immediateSteps: ['Continue current care routine', 'Monitor weekly during wet seasons', 'Ensure adequate spacing for airflow'],
    preventionTips: ['Maintain balanced fertilisation — avoid excess nitrogen', 'Mulch around the base to retain moisture', 'Inspect regularly for early pest or disease signs'],
    alternateConditions: [],
  },
  // 4 - Blueberry Healthy
  {
    displayName: 'Healthy Blueberry',
    plant: 'Blueberry',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Deep green foliage with no spots or lesions', 'Firm, plump berry clusters', 'Normal cane structure and growth'],
    immediateSteps: ['Continue regular irrigation and mulching', 'Test soil pH — blueberries prefer 4.5–5.5', 'Monitor for spotted wing drosophila during harvest'],
    preventionTips: ['Maintain acidic soil conditions with pine bark mulch', 'Prune old canes to encourage fresh growth', 'Use bird netting to reduce pest damage'],
    alternateConditions: [],
  },
  // 5 - Cherry Powdery Mildew
  {
    displayName: 'Cherry Powdery Mildew',
    plant: 'Cherry (including sour)',
    isHealthy: false,
    severity: 'Mild',
    scientificCategory: 'Fungal infection (Podosphaera clandestina)',
    observations: ['White powdery coating on young leaves and shoots', 'Leaf curling and distortion', 'Stunted or blighted shoot tips'],
    immediateSteps: ['Apply potassium bicarbonate or sulfur-based spray', 'Remove heavily infected shoot tips', 'Improve airflow by thinning dense growth', 'Avoid excessive nitrogen fertilisation'],
    preventionTips: ['Plant in full sun locations with good air circulation', 'Choose mildew-resistant cherry varieties', 'Apply neem oil preventatively in spring'],
    alternateConditions: ['Cherry Leaf Spot', 'Brown Rot', 'Aphid damage'],
  },
  // 6 - Cherry Healthy
  {
    displayName: 'Healthy Cherry',
    plant: 'Cherry (including sour)',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Glossy green leaves with no white coating or spots', 'Healthy new shoot growth', 'Firm, developing fruit'],
    immediateSteps: ['Maintain current care — tree looks healthy', 'Apply dormant oil spray in late winter as prevention', 'Thin fruit clusters to improve air circulation'],
    preventionTips: ['Prune for an open vase shape to maximise airflow', 'Avoid wetting foliage during irrigation', 'Remove fallen leaves to prevent overwintering spores'],
    alternateConditions: [],
  },
  // 7 - Corn Cercospora / Gray Leaf Spot
  {
    displayName: 'Corn Gray Leaf Spot',
    plant: 'Corn (Maize)',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Cercospora zeae-maydis)',
    observations: ['Rectangular gray to tan lesions with parallel edges', 'Lesions run between leaf veins giving a striped look', 'Lower leaves affected first, progressing upward'],
    immediateSteps: ['Apply strobilurin or triazole fungicide at tasseling', 'Rotate to non-host crop next season', 'Till infected residue to reduce inoculum'],
    preventionTips: ['Plant resistant hybrid varieties', 'Ensure proper plant spacing for air circulation', 'Avoid continuous corn planting in the same field'],
    alternateConditions: ['Northern Leaf Blight', 'Common Rust', 'Anthracnose Leaf Blight'],
  },
  // 8 - Corn Common Rust
  {
    displayName: 'Corn Common Rust',
    plant: 'Corn (Maize)',
    isHealthy: false,
    severity: 'Mild',
    scientificCategory: 'Fungal infection (Puccinia sorghi)',
    observations: ['Oval to elongated brick-red pustules on both leaf surfaces', 'Pustules rupture to release powdery rust-colored spores', 'Severe infections cause premature leaf death'],
    immediateSteps: ['Apply triazole fungicide if infection is severe before tasseling', 'Avoid fields with confirmed high rust pressure', 'Scout fields regularly from V6 onward'],
    preventionTips: ['Choose rust-resistant corn hybrids', 'Avoid late planting which extends spore exposure window', 'Monitor weather — cool moist nights favour rust spread'],
    alternateConditions: ['Southern Rust', 'Gray Leaf Spot', 'Eyespot'],
  },
  // 9 - Corn Northern Leaf Blight
  {
    displayName: 'Corn Northern Leaf Blight',
    plant: 'Corn (Maize)',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Fungal infection (Exserohilum turcicum)',
    observations: ['Large cigar-shaped tan to gray lesions 2.5–15 cm long', 'Olive-gray spore masses visible in humid conditions', 'Lesions can coalesce causing complete leaf death'],
    immediateSteps: ['Apply fungicide (propiconazole or pyraclostrobin) if detected early', 'Reduce crop residue by tillage or rotation', 'Remove heavily infected plant material from field'],
    preventionTips: ['Plant highly rated resistant hybrids', 'Rotate with soybeans or other non-host crops', 'Maintain residue management to reduce overwintering inoculum'],
    alternateConditions: ['Gray Leaf Spot', 'Anthracnose Stalk Rot', 'Stewart\'s Wilt'],
  },
  // 10 - Corn Healthy
  {
    displayName: 'Healthy Corn',
    plant: 'Corn (Maize)',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Broad, upright dark green leaves with no lesions', 'Healthy stalk development', 'Normal tassel and ear formation'],
    immediateSteps: ['Continue scouting weekly for pest and disease signs', 'Maintain balanced nitrogen nutrition', 'Check irrigation efficiency during dry spells'],
    preventionTips: ['Rotate crops annually to break disease cycles', 'Use certified disease-free seed', 'Maintain adequate plant spacing'],
    alternateConditions: [],
  },
  // 11 - Grape Black Rot
  {
    displayName: 'Grape Black Rot',
    plant: 'Grape',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Fungal infection (Guignardia bidwellii)',
    observations: ['Small reddish-brown circular leaf lesions with dark border', 'Berries shrivel into hard black mummies', 'Black pycnidia (fruiting bodies) visible in lesion centers'],
    immediateSteps: ['Remove and destroy all mummified berries immediately', 'Apply mancozeb or myclobutanil fungicide from bud break', 'Prune for open canopy structure', 'Avoid any overhead watering on foliage'],
    preventionTips: ['Remove all mummies before buds swell in spring', 'Maintain clean vineyard floor and trellising', 'Apply dormant lime-sulfur spray in late winter'],
    alternateConditions: ['Botrytis (Gray Mold)', 'Downy Mildew', 'Anthracnose'],
  },
  // 12 - Grape Esca (Black Measles)
  {
    displayName: 'Grape Esca (Black Measles)',
    plant: 'Grape',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Fungal wood disease complex (Phaeomoniella / Phaeoacremonium)',
    observations: ['Tiger-stripe chlorosis/necrosis between leaf veins', 'Small dark spots on berries causing "measles" appearance', 'Internal wood shows brown streaking when cut'],
    immediateSteps: ['Immediately remove and destroy severely infected vines', 'Paint pruning wounds with wound sealant', 'Avoid pruning in wet weather', 'Do not compost infected material'],
    preventionTips: ['Prune during dry periods and seal all wounds', 'Use certified pathogen-free planting material', 'Minimise large pruning wounds by multi-year pruning approach'],
    alternateConditions: ['Eutypa Dieback', 'Botryosphaeria Dieback', 'Powdery Mildew'],
  },
  // 13 - Grape Leaf Blight
  {
    displayName: 'Grape Leaf Blight (Isariopsis)',
    plant: 'Grape',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Pseudocercospora vitis)',
    observations: ['Irregular dark brown spots on upper leaf surface', 'Brown velvety growth on leaf underside', 'Premature defoliation in severe cases'],
    immediateSteps: ['Apply copper-based or mancozeb fungicide', 'Remove heavily infected leaves from the canopy', 'Ensure good airflow through canopy management'],
    preventionTips: ['Avoid dense planting — maintain spacing', 'Keep leaves dry with drip irrigation', 'Apply preventative copper sprays from early spring'],
    alternateConditions: ['Downy Mildew', 'Anthracnose', 'Angular Leaf Scorch'],
  },
  // 14 - Grape Healthy
  {
    displayName: 'Healthy Grape',
    plant: 'Grape',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Vibrant green palmately lobed leaves', 'No spots, lesions, or powdery coating', 'Uniform cluster development'],
    immediateSteps: ['Continue routine vineyard management', 'Scout for mites and leafhoppers during warm periods', 'Maintain trellis system for airflow'],
    preventionTips: ['Apply preventative sulfur sprays in spring', 'Practice balanced irrigation to avoid stress', 'Mulch under vines to reduce splash-back inoculum'],
    alternateConditions: [],
  },
  // 15 - Orange Huanglongbing (Citrus Greening)
  {
    displayName: 'Citrus Greening (HLB)',
    plant: 'Orange',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Bacterial infection (Candidatus Liberibacter asiaticus)',
    observations: ['Asymmetric yellowing (blotchy mottle) of leaves', 'Small lopsided fruits that stay green or turn yellow prematurely', 'Twig dieback and sparse canopy'],
    immediateSteps: ['Immediately notify local agricultural authorities — HLB is quarantine-regulated', 'Remove and destroy infected trees to prevent spread', 'Control Asian citrus psyllid vector with insecticides', 'Do NOT move budwood or fruit from affected areas'],
    preventionTips: ['Use certified disease-free nursery stock', 'Manage psyllid populations aggressively with systemic insecticides', 'Inspect new planting material before introduction'],
    alternateConditions: ['Zinc Deficiency', 'Citrus Tristeza Virus', 'Phytophthora Root Rot'],
  },
  // 16 - Peach Bacterial Spot
  {
    displayName: 'Peach Bacterial Spot',
    plant: 'Peach',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Bacterial infection (Xanthomonas arboricola pv. pruni)',
    observations: ['Water-soaked angular spots on leaves that turn dark', 'Spots fall out leaving "shot-hole" appearance', 'Sunken dark lesions on fruit surface'],
    immediateSteps: ['Apply copper hydroxide or oxytetracycline bactericide', 'Avoid overhead irrigation — switch to drip', 'Remove heavily spotted fruit to reduce inoculum'],
    preventionTips: ['Choose resistant peach varieties', 'Avoid excessive nitrogen that promotes soft growth', 'Apply preventive copper sprays from green tip through shuck fall'],
    alternateConditions: ['Peach Scab', 'Leaf Curl', 'Coryneum Blight'],
  },
  // 17 - Peach Healthy
  {
    displayName: 'Healthy Peach',
    plant: 'Peach',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Long lance-shaped leaves with bright green colour', 'No shot-holes, spots, or curling', 'Healthy fruit set and development'],
    immediateSteps: ['Continue current spray program', 'Thin fruit for better sizing and airflow', 'Monitor for oriental fruit moth and brown rot'],
    preventionTips: ['Apply dormant copper spray before bud swell', 'Prune annually to open canopy', 'Maintain a clean orchard floor to reduce overwintering pests'],
    alternateConditions: [],
  },
  // 18 - Pepper Bacterial Spot
  {
    displayName: 'Bell Pepper Bacterial Spot',
    plant: 'Pepper (bell)',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Bacterial infection (Xanthomonas euvesicatoria)',
    observations: ['Small water-soaked spots becoming dark raised lesions', 'Yellow halo around dark leaf spots', 'Scab-like lesions on fruit surface'],
    immediateSteps: ['Apply copper bactericide with mancozeb tank mix', 'Remove infected plants or heavily infected plant parts', 'Avoid working in wet fields to prevent spread', 'Disinfect tools between plants'],
    preventionTips: ['Use certified disease-free seed or transplants', 'Rotate peppers with non-solanaceous crops for 2+ years', 'Avoid overhead sprinkler irrigation'],
    alternateConditions: ['Phytophthora Blight', 'Anthracnose', 'Cercospora Leaf Spot'],
  },
  // 19 - Pepper Healthy
  {
    displayName: 'Healthy Bell Pepper',
    plant: 'Pepper (bell)',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Glossy dark green leaves with no lesions', 'Firm developing fruits', 'Strong upright stems with healthy branching'],
    immediateSteps: ['Continue current management', 'Scout for aphids and thrips which can vector viruses', 'Ensure consistent soil moisture to prevent blossom end rot'],
    preventionTips: ['Mulch to maintain soil moisture and reduce splash-back', 'Stake plants for support in windy conditions', 'Rotate crops annually'],
    alternateConditions: [],
  },
  // 20 - Potato Early Blight
  {
    displayName: 'Potato Early Blight',
    plant: 'Potato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Alternaria solani)',
    observations: ['Dark brown target-ring lesions on older lower leaves', 'Yellow halo surrounding concentric ring spots', 'Lesions start on mature foliage and progress upward'],
    immediateSteps: ['Apply mancozeb or chlorothalonil fungicide immediately', 'Remove and destroy heavily infected lower leaves', 'Avoid irrigation in the evening — water in the morning', 'Ensure balanced fertilisation (adequate potassium)'],
    preventionTips: ['Use certified seed potatoes from reputable sources', 'Rotate with non-solanaceous crops for 2–3 years', 'Avoid overhead irrigation — use drip irrigation'],
    alternateConditions: ['Late Blight', 'Cercospora Leaf Spot', 'Septoria Leaf Spot'],
  },
  // 21 - Potato Late Blight
  {
    displayName: 'Potato Late Blight',
    plant: 'Potato',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Oomycete (Phytophthora infestans) — the Irish Famine pathogen',
    observations: ['Pale green water-soaked patches on leaves turning brown rapidly', 'White fuzzy sporulation on leaf underside in humid conditions', 'Dark sunken lesions on tubers'],
    immediateSteps: ['Apply metalaxyl + mancozeb or cymoxanil fungicide immediately', 'Stop all overhead irrigation', 'Destroy infected haulm before harvest to protect tubers', 'Notify neighbours — late blight spreads rapidly across fields'],
    preventionTips: ['Plant resistant varieties (Sarpo Mira, Cara, etc.)', 'Use certified disease-free seed tubers', 'Monitor BlightCast weather alerts and apply protectant sprays proactively'],
    alternateConditions: ['Early Blight', 'Phytophthora Crown Rot', 'Bacterial Soft Rot'],
  },
  // 22 - Potato Healthy
  {
    displayName: 'Healthy Potato',
    plant: 'Potato',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Upright stems with bright green pinnate leaves', 'No water-soaked patches, spots, or wilting', 'Normal flowering development'],
    immediateSteps: ['Continue protective fungicide program in high-risk weather', 'Hill soil around stems to prevent tuber greening', 'Monitor for Colorado potato beetle'],
    preventionTips: ['Use certified seed potatoes', 'Rotate crops — avoid planting in solanaceous-affected fields', 'Earth up early to protect developing tubers'],
    alternateConditions: [],
  },
  // 23 - Raspberry Healthy
  {
    displayName: 'Healthy Raspberry',
    plant: 'Raspberry',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Vigorous canes with compound leaves showing no lesions', 'Normal fruit set and berry development', 'No orange rust pustules or cane cankers'],
    immediateSteps: ['Tie in new canes and remove fruited old canes after harvest', 'Monitor for spotted wing drosophila', 'Maintain weed-free bed to improve airflow'],
    preventionTips: ['Plant in full sun with well-draining soil', 'Remove and destroy old canes after fruiting', 'Apply dormant lime-sulfur to reduce overwintering rust spores'],
    alternateConditions: [],
  },
  // 24 - Soybean Healthy
  {
    displayName: 'Healthy Soybean',
    plant: 'Soybean',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Trifoliate leaves showing rich green colour', 'No chlorosis, lesions, or pod distortion', 'Normal pod fill and nodulation'],
    immediateSteps: ['Continue current crop management', 'Scout for soybean aphid and bean leaf beetle', 'Ensure adequate potassium for pod development'],
    preventionTips: ['Rotate with non-legume crops', 'Use certified seed with appropriate seed treatment', 'Monitor for sudden death syndrome in wet soils'],
    alternateConditions: [],
  },
  // 25 - Squash Powdery Mildew
  {
    displayName: 'Squash Powdery Mildew',
    plant: 'Squash',
    isHealthy: false,
    severity: 'Mild',
    scientificCategory: 'Fungal infection (Podosphaera xanthii / Erysiphe cichoracearum)',
    observations: ['White powdery circular colonies on upper leaf surface', 'Leaves yellow and wither as infection progresses', 'Lesions eventually cover entire leaf surface'],
    immediateSteps: ['Apply potassium bicarbonate, neem oil, or sulfur spray', 'Remove the most heavily infected leaves', 'Water at soil level only — avoid wetting foliage', 'Increase plant spacing for better airflow'],
    preventionTips: ['Choose powdery mildew-resistant squash varieties', 'Apply preventative neem oil sprays in early summer', 'Avoid excessive nitrogen fertilisation'],
    alternateConditions: ['Downy Mildew', 'Angular Leaf Spot', 'Botrytis'],
  },
  // 26 - Strawberry Leaf Scorch
  {
    displayName: 'Strawberry Leaf Scorch',
    plant: 'Strawberry',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Diplocarpon earlianum)',
    observations: ['Small purple to brick-red spots on upper leaf surface', 'Spots lack distinct target rings (unlike leaf spot)', 'Heavily infected leaves appear scorched and brown'],
    immediateSteps: ['Apply captan or myclobutanil fungicide', 'Remove old infected foliage at renovation', 'Mow and remove all plant debris after harvest', 'Avoid dense planting — improve spacing'],
    preventionTips: ['Use certified disease-free transplants', 'Renovate planting by mowing and thinning after harvest', 'Apply protective fungicide programme from early spring'],
    alternateConditions: ['Common Leaf Spot', 'Angular Leaf Spot', 'Botrytis Crown Rot'],
  },
  // 27 - Strawberry Healthy
  {
    displayName: 'Healthy Strawberry',
    plant: 'Strawberry',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Bright green trifoliate leaves with no spots or scorch', 'Healthy white flowers and developing fruit', 'Vigorous runner production'],
    immediateSteps: ['Continue routine irrigation and mulching', 'Monitor for two-spotted spider mite during hot weather', 'Remove old leaves and runners as needed'],
    preventionTips: ['Renew plantings every 3 years to reset disease pressure', 'Use raised beds with good drainage', 'Mulch with straw to keep fruit off the soil'],
    alternateConditions: [],
  },
  // 28 - Tomato Bacterial Spot
  {
    displayName: 'Tomato Bacterial Spot',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Bacterial infection (Xanthomonas perforans)',
    observations: ['Small dark water-soaked lesions with yellow margins', 'Raised scab-like spots on green fruit', 'Severe defoliation of lower leaves in wet conditions'],
    immediateSteps: ['Apply copper bactericide combined with mancozeb', 'Stake and prune to improve airflow', 'Avoid working with plants when wet', 'Remove severely infected plants'],
    preventionTips: ['Use certified pathogen-free transplants', 'Avoid overhead irrigation — use drip', 'Rotate tomatoes with non-solanaceous crops for 2 years'],
    alternateConditions: ['Early Blight', 'Septoria Leaf Spot', 'Speck (P. syringae)'],
  },
  // 29 - Tomato Early Blight
  {
    displayName: 'Tomato Early Blight',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Alternaria solani)',
    observations: ['Dark brown bull\'s-eye target ring lesions on older leaves', 'Yellow chlorotic halo around lesions', 'Starts on lower leaves and progresses upward'],
    immediateSteps: ['Apply chlorothalonil or mancozeb fungicide promptly', 'Remove and dispose of infected lower leaves', 'Mulch to prevent splash-back from soil', 'Water at the base — avoid wetting foliage'],
    preventionTips: ['Stake plants to keep foliage off the ground', 'Rotate tomato crops every 2–3 years', 'Choose resistant or tolerant varieties where available'],
    alternateConditions: ['Late Blight', 'Septoria Leaf Spot', 'Leaf Mold'],
  },
  // 30 - Tomato Late Blight
  {
    displayName: 'Tomato Late Blight',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Oomycete (Phytophthora infestans)',
    observations: ['Greasy water-soaked patches rapidly turning dark brown', 'White fuzzy sporulation on leaf undersides in humid air', 'Firm brown rot on green or ripe fruit'],
    immediateSteps: ['Apply metalaxyl or cymoxanil + mancozeb immediately', 'Remove and bag all infected plant material — do not compost', 'Stop overhead irrigation immediately', 'Isolate infected plants to slow spread'],
    preventionTips: ['Monitor forecasts for humid cool nights — apply preventive sprays', 'Plant certified late-blight-resistant varieties', 'Destroy volunteer tomato and potato plants nearby'],
    alternateConditions: ['Tomato Early Blight', 'Bacterial Speck', 'Phytophthora Crown Rot'],
  },
  // 31 - Tomato Leaf Mold
  {
    displayName: 'Tomato Leaf Mold',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Passalora fulva / Fulvia fulva)',
    observations: ['Pale green-yellow patches on upper leaf surface', 'Olive-brown velvety mold growth on leaf underside', 'Leaves curl upward and defoliate in severe cases'],
    immediateSteps: ['Increase ventilation in greenhouse or polytunnel immediately', 'Apply chlorothalonil or mancozeb fungicide', 'Remove infected leaves and bag them — do not compost', 'Reduce humidity below 85% if possible'],
    preventionTips: ['Maintain relative humidity below 85% in enclosed growing spaces', 'Space plants for maximum airflow', 'Choose leaf-mold-resistant varieties for greenhouse production'],
    alternateConditions: ['Early Blight', 'Botrytis Gray Mold', 'Downy Mildew'],
  },
  // 32 - Tomato Septoria Leaf Spot
  {
    displayName: 'Tomato Septoria Leaf Spot',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Septoria lycopersici)',
    observations: ['Numerous small circular spots with dark border and light grey centre', 'Tiny black pycnidia visible in spot centres', 'Severe defoliation starting from lowest leaves'],
    immediateSteps: ['Apply mancozeb or chlorothalonil fungicide', 'Remove and destroy infected lower leaves', 'Mulch to prevent soil splash', 'Stake plants to keep foliage elevated'],
    preventionTips: ['Rotate crops — avoid tomatoes in the same bed for 2+ years', 'Avoid overhead watering', 'Destroy all tomato plant debris at season end'],
    alternateConditions: ['Bacterial Speck', 'Early Blight', 'Anthracnose'],
  },
  // 33 - Tomato Spider Mites
  {
    displayName: 'Tomato Spider Mite Damage',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Pest infestation (Tetranychus urticae — Two-spotted spider mite)',
    observations: ['Fine stippling and bronzing on upper leaf surface', 'Fine silken webbing on leaf undersides', 'Tiny moving dots visible under magnification'],
    immediateSteps: ['Apply abamectin or spiromesifen miticide — rotate modes of action', 'Spray undersides of leaves thoroughly', 'Increase plant humidity — mites thrive in hot dry conditions', 'Introduce predatory mites (Phytoseiulus persimilis) if available'],
    preventionTips: ['Maintain adequate irrigation — drought stress worsens infestations', 'Avoid broad-spectrum insecticides that kill natural predators', 'Remove dusty conditions around plants which favour mite outbreaks'],
    alternateConditions: ['Broad Mite', 'Russet Mite', 'Phytotoxicity from spray drift'],
  },
  // 34 - Tomato Target Spot
  {
    displayName: 'Tomato Target Spot',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Moderate',
    scientificCategory: 'Fungal infection (Corynespora cassiicola)',
    observations: ['Brown concentric-ring target lesions on leaves and stems', 'Lesions may have yellow halo', 'Dark sunken lesions with light centre on fruit'],
    immediateSteps: ['Apply azoxystrobin or chlorothalonil fungicide', 'Remove infected leaves promptly', 'Improve canopy airflow by staking and pruning', 'Avoid leaf wetness — water at base only'],
    preventionTips: ['Use resistant varieties if available in your region', 'Rotate crops with non-solanaceous plants', 'Remove and destroy crop residues at season end'],
    alternateConditions: ['Early Blight', 'Septoria Leaf Spot', 'Bacterial Spot'],
  },
  // 35 - Tomato Yellow Leaf Curl Virus
  {
    displayName: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Viral disease (Begomovirus) — transmitted by whitefly',
    observations: ['Severe upward cupping and yellowing of young leaves', 'Stunted plant growth with reduced fruit set', 'Abnormally small leaves with crinkled margins'],
    immediateSteps: ['Remove and destroy severely infected plants immediately', 'Apply imidacloprid or thiamethoxam to control whitefly vector', 'Use yellow sticky traps to monitor and reduce whitefly populations', 'Prevent access with fine insect-proof netting'],
    preventionTips: ['Plant TYLCV-resistant tomato varieties (TY series)', 'Use reflective silver mulch to deter whiteflies', 'Eliminate weed hosts around the growing area'],
    alternateConditions: ['Tomato Mosaic Virus', 'Nutrient Deficiency', 'Herbicide Injury'],
  },
  // 36 - Tomato Mosaic Virus
  {
    displayName: 'Tomato Mosaic Virus (ToMV)',
    plant: 'Tomato',
    isHealthy: false,
    severity: 'Severe',
    scientificCategory: 'Viral disease (Tobamovirus) — mechanically transmitted',
    observations: ['Mosaic light/dark green mottling on leaves', 'Leaf distortion and fern-like filiform symptoms', 'Stunted growth and internal fruit browning'],
    immediateSteps: ['Remove infected plants immediately — there is no cure', 'Wash hands and disinfect tools with 10% bleach or 70% ethanol', 'Do not smoke near tomato plants — tobacco can carry virus', 'Control aphid vectors with insecticidal soap'],
    preventionTips: ['Use TMV/ToMV-resistant varieties', 'Use certified virus-free seed and transplants', 'Avoid touching healthy plants after handling infected ones'],
    alternateConditions: ['TYLCV', 'Tomato Spotted Wilt Virus', 'Nutrient Imbalance'],
  },
  // 37 - Tomato Healthy
  {
    displayName: 'Healthy Tomato',
    plant: 'Tomato',
    isHealthy: true,
    severity: 'Healthy',
    scientificCategory: 'No disease detected',
    observations: ['Deep green, glossy compound leaves with no spots', 'Strong, upright stems with good fruit set', 'No wilting, curling, or mottling visible'],
    immediateSteps: ['Continue current management programme', 'Apply preventive fungicide if humidity exceeds 80%', 'Scout for hornworm and aphids weekly'],
    preventionTips: ['Stake and sucker for airflow', 'Rotate crops annually to break disease cycles', 'Use drip irrigation to keep foliage dry'],
    alternateConditions: [],
  },
];

/**
 * Decode a raw model output index (0–152) into a canonical DiseaseLabel.
 *
 * The model was trained on a dataset that treated train/valid splits and
 * case-variant folder prefixes as separate classes, producing 153 outputs
 * for only 38 unique diseases. Index 152 is a noise/test class.
 *
 * @param rawIndex - The argMax index from the model output tensor.
 * @returns The matching DiseaseLabel, or a fallback "Unknown" label.
 */
export function getLabelByRawIndex(rawIndex: number): DiseaseLabel {
  if (rawIndex === 152 || rawIndex < 0) {
    return {
      displayName: 'Unknown / Unrecognised',
      plant: 'Unknown',
      isHealthy: false,
      severity: 'Mild',
      scientificCategory: 'Unable to classify',
      observations: ['The image could not be matched to a known plant disease', 'Image may be too blurry, dark, or not of a plant leaf', 'Try a clearer, well-lit close-up of the affected area'],
      immediateSteps: ['Take a new photo with good natural lighting', 'Photograph the most symptomatic leaf or area closely', 'Consult a local agricultural extension officer'],
      preventionTips: ['Capture multiple photos from different angles for better results', 'Ensure the plant fills most of the frame'],
      alternateConditions: [],
    };
  }
  const canonicalIndex = rawIndex % 38;
  return DISEASE_LABELS[canonicalIndex] ?? DISEASE_LABELS[0];
}
