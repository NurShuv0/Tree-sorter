export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  category: 'Fruits' | 'Vegetables' | 'Flowers' | 'Herbs' | 'Indoor' | 'Outdoor';
  image: string;
  description: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  sunlight: 'Full Sun' | 'Partial Sun' | 'Shade';
  soilType: 'Loamy' | 'Sandy' | 'Clay' | 'Well-drained';
  growthDuration: string;
  bestSeason: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  careInstructions: string;
  fertilizerTips: string;
  harvestingTips: string;
  commonDiseases: string[];
  preventionTips: string;
  companionPlants: string[];
  avoidNearby: string[];
  isFeatured: boolean;
  isBeginner: boolean;
  isLowMaintenance: boolean;
  weatherPreference: {
    temperature: 'hot' | 'warm' | 'cool' | 'cold';
    humidity: 'high' | 'medium' | 'low';
    rainfall: 'heavy' | 'moderate' | 'light';
  };
}

export const plants: Plant[] = [
  {
    id: 1,
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&q=80",
    description: "A popular garden vegetable that grows well in warm sunlight and produces juicy, flavorful fruits.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "60-90 days",
    bestSeason: "Spring and Summer",
    difficulty: "Easy",
    careInstructions: "Water regularly, provide support with stakes or cages, and keep in direct sunlight for at least 6-8 hours daily.",
    fertilizerTips: "Apply balanced fertilizer every 2 weeks. Use compost or well-rotted manure at planting time.",
    harvestingTips: "Harvest when fruits are fully colored but still firm. Pick regularly to encourage more production.",
    commonDiseases: ["Leaf spot", "Blight", "Powdery mildew"],
    preventionTips: "Avoid overwatering and ensure proper air circulation. Remove affected leaves immediately.",
    companionPlants: ["Basil", "Carrot", "Marigold"],
    avoidNearby: ["Potato", "Corn"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 2,
    name: "Basil",
    scientificName: "Ocimum basilicum",
    category: "Herbs",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=800&q=80",
    description: "Aromatic herb with fragrant leaves perfect for cooking. Easy to grow and maintain.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "40-60 days",
    bestSeason: "Spring and Summer",
    difficulty: "Easy",
    careInstructions: "Keep soil moist but not waterlogged. Pinch off flower buds to encourage leaf growth.",
    fertilizerTips: "Feed with liquid fertilizer every 3-4 weeks during growing season.",
    harvestingTips: "Harvest leaves regularly, starting from the top. Never take more than 1/3 of the plant at once.",
    commonDiseases: ["Downy mildew", "Fusarium wilt"],
    preventionTips: "Ensure good air circulation and avoid overhead watering.",
    companionPlants: ["Tomato", "Pepper", "Oregano"],
    avoidNearby: ["Rue", "Sage"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'hot',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 3,
    name: "Marigold",
    scientificName: "Tagetes",
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=800&q=80",
    description: "Vibrant flowering plant that adds color to gardens and helps repel pests naturally.",
    waterRequirement: "Low",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "45-50 days",
    bestSeason: "All seasons",
    difficulty: "Easy",
    careInstructions: "Water when soil feels dry. Deadhead spent flowers to encourage more blooms.",
    fertilizerTips: "Use balanced fertilizer monthly. Avoid over-fertilizing which can reduce flowering.",
    harvestingTips: "Cut flowers in the morning for longest vase life. Remove dead flowers regularly.",
    commonDiseases: ["Powdery mildew", "Root rot"],
    preventionTips: "Avoid overwatering and ensure good drainage. Space plants properly for air flow.",
    companionPlants: ["Tomato", "Cabbage", "Cucumber"],
    avoidNearby: ["Beans"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'low',
      rainfall: 'light'
    }
  },
  {
    id: 4,
    name: "Chili Pepper",
    scientificName: "Capsicum annuum",
    category: "Vegetables",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Chilli_pepper_plant.jpg",
    description: "Spicy peppers that add heat to dishes. Thrives in warm, sunny conditions.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Loamy",
    growthDuration: "70-90 days",
    bestSeason: "Summer and Monsoon",
    difficulty: "Medium",
    careInstructions: "Water consistently and provide support as plants grow. Protect from strong winds.",
    fertilizerTips: "Use phosphorus-rich fertilizer to promote flowering and fruiting.",
    harvestingTips: "Harvest when peppers reach desired size and color. Use scissors to avoid damaging plants.",
    commonDiseases: ["Bacterial spot", "Anthracnose", "Blossom end rot"],
    preventionTips: "Maintain consistent watering and ensure adequate calcium in soil.",
    companionPlants: ["Basil", "Onion", "Spinach"],
    avoidNearby: ["Fennel", "Kohlrabi"],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'hot',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 5,
    name: "Mint",
    scientificName: "Mentha",
    category: "Herbs",
    image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&q=80",
    description: "Refreshing herb that spreads easily. Perfect for teas, drinks, and culinary uses.",
    waterRequirement: "High",
    sunlight: "Partial Sun",
    soilType: "Well-drained",
    growthDuration: "30-40 days",
    bestSeason: "Monsoon and Winter",
    difficulty: "Easy",
    careInstructions: "Keep soil consistently moist. Grow in containers to prevent invasive spreading.",
    fertilizerTips: "Apply light fertilizer monthly. Too much fertilizer reduces flavor.",
    harvestingTips: "Harvest leaves regularly to encourage bushy growth. Best harvested before flowering.",
    commonDiseases: ["Rust", "Powdery mildew"],
    preventionTips: "Ensure good air circulation and avoid overcrowding.",
    companionPlants: ["Cabbage", "Tomato", "Peas"],
    avoidNearby: ["Parsley", "Chamomile"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'high',
      rainfall: 'heavy'
    }
  },
  {
    id: 6,
    name: "Spinach",
    scientificName: "Spinacia oleracea",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80",
    description: "Nutritious leafy green that grows quickly in cool weather. Rich in vitamins and minerals.",
    waterRequirement: "Medium",
    sunlight: "Partial Sun",
    soilType: "Loamy",
    growthDuration: "40-50 days",
    bestSeason: "Winter and Monsoon",
    difficulty: "Easy",
    careInstructions: "Keep soil moist and harvest outer leaves first to extend harvest period.",
    fertilizerTips: "Use nitrogen-rich fertilizer every 2-3 weeks for lush leaf growth.",
    harvestingTips: "Pick outer leaves when they reach 3-4 inches. Harvest in the morning for best flavor.",
    commonDiseases: ["Downy mildew", "Leaf spot"],
    preventionTips: "Avoid overhead watering and ensure good spacing between plants.",
    companionPlants: ["Strawberry", "Radish", "Peas"],
    avoidNearby: ["Potato"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'high',
      rainfall: 'moderate'
    }
  },
  {
    id: 7,
    name: "Rose",
    scientificName: "Rosa",
    category: "Flowers",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Red_Rose.jpg",
    description: "Classic beautiful flowering plant available in many colors. Requires regular care and attention.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "60-90 days to bloom",
    bestSeason: "Winter and Spring",
    difficulty: "Advanced",
    careInstructions: "Prune regularly, water deeply, and protect from pests. Mulch around base to retain moisture.",
    fertilizerTips: "Feed with rose-specific fertilizer monthly during growing season.",
    harvestingTips: "Cut flowers early morning at 45-degree angle just above a five-leaflet leaf.",
    commonDiseases: ["Black spot", "Powdery mildew", "Rust"],
    preventionTips: "Ensure good air circulation, water at base, and remove fallen leaves promptly.",
    companionPlants: ["Garlic", "Lavender", "Geranium"],
    avoidNearby: ["Boxwood"],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 8,
    name: "Coriander",
    scientificName: "Coriandrum sativum",
    category: "Herbs",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg",
    description: "Versatile herb used in many cuisines. Both leaves and seeds are edible and flavorful.",
    waterRequirement: "Medium",
    sunlight: "Partial Sun",
    soilType: "Well-drained",
    growthDuration: "40-50 days",
    bestSeason: "Winter",
    difficulty: "Easy",
    careInstructions: "Water regularly and harvest frequently to prevent bolting. Prefers cooler temperatures.",
    fertilizerTips: "Use minimal fertilizer as too much reduces flavor. Compost is usually sufficient.",
    harvestingTips: "Harvest outer leaves first. For seeds, allow plant to flower and dry seed heads.",
    commonDiseases: ["Powdery mildew", "Leaf spot"],
    preventionTips: "Avoid overcrowding and ensure good air flow. Water at soil level.",
    companionPlants: ["Spinach", "Lettuce", "Tomato"],
    avoidNearby: ["Fennel"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'medium',
      rainfall: 'light'
    }
  },
  {
    id: 9,
    name: "Okra",
    scientificName: "Abelmoschus esculentus",
    category: "Vegetables",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hong_Kong_Okra_Aug_25_2012.JPG/960px-Hong_Kong_Okra_Aug_25_2012.JPG",
    description: "Heat-loving vegetable that produces edible pods. Thrives in hot, humid conditions.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "50-65 days",
    bestSeason: "Summer",
    difficulty: "Easy",
    careInstructions: "Water regularly but avoid waterlogging. Harvest pods when young and tender.",
    fertilizerTips: "Apply balanced fertilizer every 3-4 weeks during growing season.",
    harvestingTips: "Harvest pods when 2-4 inches long. Pick every 2-3 days to encourage production.",
    commonDiseases: ["Powdery mildew", "Leaf spot", "Root rot"],
    preventionTips: "Ensure good drainage and avoid overhead watering in humid conditions.",
    companionPlants: ["Cucumber", "Eggplant", "Pepper"],
    avoidNearby: ["Potato"],
    isFeatured: false,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'hot',
      humidity: 'high',
      rainfall: 'moderate'
    }
  },
  {
    id: 10,
    name: "Cucumber",
    scientificName: "Cucumis sativus",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80",
    description: "Refreshing vegetable that grows quickly. Perfect for salads and pickles.",
    waterRequirement: "High",
    sunlight: "Full Sun",
    soilType: "Loamy",
    growthDuration: "50-70 days",
    bestSeason: "Spring and Summer",
    difficulty: "Medium",
    careInstructions: "Provide trellis support, water consistently, and mulch to retain moisture.",
    fertilizerTips: "Feed with balanced fertilizer weekly during fruit production.",
    harvestingTips: "Harvest when firm and green. Pick regularly to encourage more fruit production.",
    commonDiseases: ["Powdery mildew", "Downy mildew", "Cucumber mosaic virus"],
    preventionTips: "Ensure good air circulation and avoid wetting leaves when watering.",
    companionPlants: ["Beans", "Corn", "Radish"],
    avoidNearby: ["Potato", "Sage"],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 11,
    name: "Sunflower",
    scientificName: "Helianthus annuus",
    category: "Flowers",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/960px-Sunflower_sky_backdrop.jpg",
    description: "Tall, cheerful flowering plant that follows the sun. Produces edible seeds.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "70-100 days",
    bestSeason: "Summer",
    difficulty: "Easy",
    careInstructions: "Water deeply but infrequently. Stake tall varieties to prevent wind damage.",
    fertilizerTips: "Feed with balanced fertilizer once a month. Avoid over-fertilizing.",
    harvestingTips: "For seeds, harvest when back of flower head turns yellow and seeds are plump.",
    commonDiseases: ["Rust", "Powdery mildew", "Downy mildew"],
    preventionTips: "Space plants properly for air circulation. Avoid overhead watering.",
    companionPlants: ["Cucumber", "Squash", "Corn"],
    avoidNearby: ["Potato", "Pole beans"],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'hot',
      humidity: 'low',
      rainfall: 'light'
    }
  },
  {
    id: 12,
    name: "Eggplant",
    scientificName: "Solanum melongena",
    category: "Vegetables",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_%281%29.JPG/960px-Solanum_melongena_24_08_2012_%281%29.JPG",
    description: "Versatile vegetable with glossy purple fruits. Requires warm weather to thrive.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Loamy",
    growthDuration: "70-85 days",
    bestSeason: "Summer",
    difficulty: "Medium",
    careInstructions: "Water consistently and protect from pests. Stake plants for support.",
    fertilizerTips: "Apply balanced fertilizer every 2 weeks once flowering begins.",
    harvestingTips: "Harvest when skin is glossy and firm. Cut with pruning shears, leaving some stem.",
    commonDiseases: ["Bacterial wilt", "Phomopsis blight", "Flea beetles"],
    preventionTips: "Use row covers to protect from pests. Ensure good drainage.",
    companionPlants: ["Beans", "Pepper", "Spinach"],
    avoidNearby: ["Potato", "Tomato"],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'hot',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 13,
    name: "Cabbage",
    scientificName: "Brassica oleracea",
    category: "Vegetables",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/960px-Cabbage_and_cross_section_on_white.jpg",
    description: "Cool-season vegetable that forms dense heads. Excellent for winter gardens.",
    waterRequirement: "High",
    sunlight: "Full Sun",
    soilType: "Loamy",
    growthDuration: "70-100 days",
    bestSeason: "Winter",
    difficulty: "Medium",
    careInstructions: "Keep soil consistently moist and protect from cabbage worms with netting.",
    fertilizerTips: "Feed with nitrogen-rich fertilizer every 2-3 weeks during head formation.",
    harvestingTips: "Harvest when heads are firm and before they split. Cut at base with sharp knife.",
    commonDiseases: ["Black rot", "Clubroot", "Aphids"],
    preventionTips: "Rotate crops annually and use row covers to protect from pests.",
    companionPlants: ["Beets", "Onion", "Celery"],
    avoidNearby: ["Strawberry", "Tomato"],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'medium',
      rainfall: 'moderate'
    }
  },
  {
    id: 14,
    name: "Carrot",
    scientificName: "Daucus carota",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80",
    description: "Root vegetable that grows underground. Sweet and crunchy when harvested fresh.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Sandy",
    growthDuration: "70-80 days",
    bestSeason: "Winter",
    difficulty: "Medium",
    careInstructions: "Ensure loose, stone-free soil for straight roots. Thin seedlings to proper spacing.",
    fertilizerTips: "Use low-nitrogen fertilizer. Too much nitrogen causes forked roots.",
    harvestingTips: "Harvest when roots reach desired size. Water before pulling for easier harvest.",
    commonDiseases: ["Carrot fly", "Leaf blight", "Root rot"],
    preventionTips: "Use row covers and ensure good drainage. Thin seedlings promptly.",
    companionPlants: ["Onion", "Lettuce", "Tomato"],
    avoidNearby: ["Dill", "Parsnip"],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'medium',
      rainfall: 'light'
    }
  },
  {
    id: 15,
    name: "Lettuce",
    scientificName: "Lactuca sativa",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80",
    description: "Quick-growing leafy vegetable perfect for salads. Prefers cool weather.",
    waterRequirement: "Medium",
    sunlight: "Partial Sun",
    soilType: "Loamy",
    growthDuration: "30-45 days",
    bestSeason: "Winter and Spring",
    difficulty: "Easy",
    careInstructions: "Keep soil consistently moist and provide afternoon shade in warm weather.",
    fertilizerTips: "Use nitrogen-rich fertilizer every 2 weeks for continuous leaf growth.",
    harvestingTips: "Harvest outer leaves for cut-and-come-again harvest, or cut entire head.",
    commonDiseases: ["Downy mildew", "Tip burn", "Aphids"],
    preventionTips: "Avoid overhead watering and ensure good air circulation.",
    companionPlants: ["Carrot", "Radish", "Beets"],
    avoidNearby: ["Celery", "Parsley"],
    isFeatured: false,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'medium',
      rainfall: 'light'
    }
  },
  {
    id: 16,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "Herbs",
    image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=800&q=80",
    description: "Tropical plant grown for its rhizomes. Used as spice and natural dye.",
    waterRequirement: "High",
    sunlight: "Partial Sun",
    soilType: "Loamy",
    growthDuration: "7-10 months",
    bestSeason: "Monsoon",
    difficulty: "Medium",
    careInstructions: "Water regularly during growing season. Reduce watering before harvest.",
    fertilizerTips: "Apply organic compost and potassium-rich fertilizer monthly.",
    harvestingTips: "Harvest when leaves turn yellow and dry. Dig carefully to avoid damaging rhizomes.",
    commonDiseases: ["Leaf spot", "Rhizome rot", "Leaf blotch"],
    preventionTips: "Ensure good drainage and avoid waterlogging during monsoon.",
    companionPlants: ["Ginger", "Banana", "Coconut"],
    avoidNearby: [],
    isFeatured: false,
    isBeginner: false,
    isLowMaintenance: false,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'high',
      rainfall: 'heavy'
    }
  },
  {
    id: 17,
    name: "Lavender",
    scientificName: "Lavandula",
    category: "Flowers",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Lavender_flowers.jpg",
    description: "Fragrant flowering herb with purple blooms. Drought-tolerant and low maintenance.",
    waterRequirement: "Low",
    sunlight: "Full Sun",
    soilType: "Well-drained",
    growthDuration: "90-100 days to bloom",
    bestSeason: "Spring and Summer",
    difficulty: "Easy",
    careInstructions: "Water sparingly once established. Prune after flowering to maintain shape.",
    fertilizerTips: "Use minimal fertilizer. Too much reduces fragrance and hardiness.",
    harvestingTips: "Cut stems when flowers just begin to open. Dry in bunches upside down.",
    commonDiseases: ["Root rot", "Leaf spot", "Fungal issues"],
    preventionTips: "Ensure excellent drainage. Avoid overwatering and humid conditions.",
    companionPlants: ["Rose", "Rosemary", "Sage"],
    avoidNearby: [],
    isFeatured: false,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'low',
      rainfall: 'light'
    }
  },
  {
    id: 18,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    category: "Indoor",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/960px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg",
    description: "Hardy indoor plant that purifies air. Extremely low maintenance and drought-tolerant.",
    waterRequirement: "Low",
    sunlight: "Shade",
    soilType: "Well-drained",
    growthDuration: "Year-round growth",
    bestSeason: "All seasons",
    difficulty: "Easy",
    careInstructions: "Water sparingly, allowing soil to dry completely between waterings. Tolerates neglect.",
    fertilizerTips: "Fertilize once in spring with diluted liquid fertilizer. Very light feeding needed.",
    harvestingTips: "Remove dead or damaged leaves at base. Propagate by division or leaf cuttings.",
    commonDiseases: ["Root rot", "Mealybugs", "Spider mites"],
    preventionTips: "Never overwater. Ensure pot has drainage holes. Wipe leaves occasionally.",
    companionPlants: ["Pothos", "Peace Lily", "Spider Plant"],
    avoidNearby: [],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'low',
      rainfall: 'light'
    }
  },
  {
    id: 19,
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    description: "Popular trailing indoor plant with heart-shaped leaves. Excellent air purifier.",
    waterRequirement: "Low",
    sunlight: "Shade",
    soilType: "Well-drained",
    growthDuration: "Year-round growth",
    bestSeason: "All seasons",
    difficulty: "Easy",
    careInstructions: "Water when top soil is dry. Tolerates low light and irregular watering.",
    fertilizerTips: "Feed monthly during growing season with balanced liquid fertilizer.",
    harvestingTips: "Trim vines to encourage bushier growth. Propagate cuttings in water.",
    commonDiseases: ["Root rot", "Bacterial leaf spot"],
    preventionTips: "Avoid overwatering. Ensure good drainage and occasional pruning.",
    companionPlants: ["Philodendron", "Snake Plant", "ZZ Plant"],
    avoidNearby: [],
    isFeatured: true,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'warm',
      humidity: 'medium',
      rainfall: 'light'
    }
  },
  {
    id: 20,
    name: "Radish",
    scientificName: "Raphanus sativus",
    category: "Vegetables",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Radish_3371103037_4ab07db0bf_o.jpg/960px-Radish_3371103037_4ab07db0bf_o.jpg",
    description: "Fast-growing root vegetable with crisp texture. Perfect for beginner gardeners.",
    waterRequirement: "Medium",
    sunlight: "Full Sun",
    soilType: "Loamy",
    growthDuration: "20-30 days",
    bestSeason: "Winter and Spring",
    difficulty: "Easy",
    careInstructions: "Keep soil moist and thin seedlings early. Harvest promptly when ready.",
    fertilizerTips: "Needs minimal fertilizer. Over-fertilizing causes leafy growth, not roots.",
    harvestingTips: "Pull when roots reach 1 inch diameter. Don't leave in ground too long or they become woody.",
    commonDiseases: ["Flea beetles", "Root maggots", "Clubroot"],
    preventionTips: "Use row covers and rotate crops. Ensure consistent watering.",
    companionPlants: ["Lettuce", "Peas", "Cucumber"],
    avoidNearby: ["Hyssop"],
    isFeatured: false,
    isBeginner: true,
    isLowMaintenance: true,
    weatherPreference: {
      temperature: 'cool',
      humidity: 'medium',
      rainfall: 'light'
    }
  },
    {
      "id": 21,
      "name": "Mango",
      "scientificName": "Mangifera indica",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/960px-Mangos_-_single_and_halved.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 22,
      "name": "Banana",
      "scientificName": "Musa acuminata",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "9-15 months",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a high level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "heavy"
      }
    },
    {
      "id": 23,
      "name": "Papaya",
      "scientificName": "Carica papaya",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-029.jpg/960px-Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-029.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "8-12 months",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 24,
      "name": "Guava",
      "scientificName": "Psidium guajava",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Guava_pink_fruit.jpg/960px-Guava_pink_fruit.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 25,
      "name": "Lemon",
      "scientificName": "Citrus limon",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/P1030323.JPG/960px-P1030323.JPG",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 26,
      "name": "Lime",
      "scientificName": "Citrus aurantiifolia",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Citrus_%C3%97_aurantiifolia_%28Christm.%29_Swingle_%2851906868474%29.jpg/960px-Citrus_%C3%97_aurantiifolia_%28Christm.%29_Swingle_%2851906868474%29.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 27,
      "name": "Orange",
      "scientificName": "Citrus sinensis",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/OrangeBloss_wb.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "3-4 years to fruit",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 28,
      "name": "Pomegranate",
      "scientificName": "Punica granatum",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pomegranate_Juice_%282019%29.jpg/960px-Pomegranate_Juice_%282019%29.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a low level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 29,
      "name": "Watermelon",
      "scientificName": "Citrullus lanatus",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/960px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "70-90 days",
      "bestSeason": "Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in sandy soil with full sun exposure. Water at a high level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 30,
      "name": "Muskmelon",
      "scientificName": "Cucumis melo",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Muskmelon.jpg/960px-Muskmelon.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "70-90 days",
      "bestSeason": "Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in sandy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 31,
      "name": "Pineapple",
      "scientificName": "Ananas comosus",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/%E0%B4%95%E0%B5%88%E0%B4%A4%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B4%95%E0%B5%8D%E0%B4%95.jpg/960px-%E0%B4%95%E0%B5%88%E0%B4%A4%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B4%95%E0%B5%8D%E0%B4%95.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "18-24 months",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 32,
      "name": "Strawberry",
      "scientificName": "Fragaria x ananassa",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/960px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 33,
      "name": "Dragon Fruit",
      "scientificName": "Selenicereus undatus",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Pitaya_cross_section_ed2.jpg/960px-Pitaya_cross_section_ed2.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "12-18 months",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a low level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 34,
      "name": "Jackfruit",
      "scientificName": "Artocarpus heterophyllus",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/The_jackfruit_is_holding_on_to_the_tree.jpg/960px-The_jackfruit_is_holding_on_to_the_tree.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "3-4 years to fruit",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 35,
      "name": "Lychee",
      "scientificName": "Litchi chinensis",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Litchi_chinensis_fruits.JPG/960px-Litchi_chinensis_fruits.JPG",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "Spring and Summer",
      "difficulty": "Advanced",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 36,
      "name": "Coconut",
      "scientificName": "Cocos nucifera",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg/960px-Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "5-6 years to fruit",
      "bestSeason": "All seasons",
      "difficulty": "Medium",
      "careInstructions": "Plant in sandy soil with full sun exposure. Water at a high level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "heavy"
      }
    },
    {
      "id": 37,
      "name": "Date Palm",
      "scientificName": "Phoenix dactylifera",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dates005.jpg/960px-Dates005.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "4-8 years to fruit",
      "bestSeason": "Summer",
      "difficulty": "Advanced",
      "careInstructions": "Plant in sandy soil with full sun exposure. Water at a low level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 38,
      "name": "Fig",
      "scientificName": "Ficus carica",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ficus_carica_L%2C_1771.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "1-2 years to fruit",
      "bestSeason": "Summer and Autumn",
      "difficulty": "Easy",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 39,
      "name": "Grapes",
      "scientificName": "Vitis vinifera",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Grapes%2C_Rostov-on-Don%2C_Russia.jpg/960px-Grapes%2C_Rostov-on-Don%2C_Russia.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "Winter and Spring",
      "difficulty": "Advanced",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 40,
      "name": "Apple",
      "scientificName": "Malus domestica",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/960px-Pink_lady_and_cross_section.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "Winter and Spring",
      "difficulty": "Advanced",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 41,
      "name": "Pear",
      "scientificName": "Pyrus communis",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "Winter and Spring",
      "difficulty": "Advanced",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 42,
      "name": "Peach",
      "scientificName": "Prunus persica",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Illustration_Prunus_persica_clean_no_descr.jpg/960px-Illustration_Prunus_persica_clean_no_descr.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-4 years to fruit",
      "bestSeason": "Spring and Summer",
      "difficulty": "Advanced",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 43,
      "name": "Plum",
      "scientificName": "Prunus domestica",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Plums_African_Rose_-_whole%2C_halved_and_slice.jpg/960px-Plums_African_Rose_-_whole%2C_halved_and_slice.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 44,
      "name": "Blueberry",
      "scientificName": "Vaccinium corymbosum",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "Winter and Spring",
      "difficulty": "Advanced",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 45,
      "name": "Passion Fruit",
      "scientificName": "Passiflora edulis",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/9/91/Passiflora_edulis_forma_flavicarpa.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "12-18 months",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a high level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 46,
      "name": "Starfruit",
      "scientificName": "Averrhoa carambola",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Averrhoa_carambola_ARS_k5735-7.jpg/960px-Averrhoa_carambola_ARS_k5735-7.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "All seasons",
      "difficulty": "Medium",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 47,
      "name": "Custard Apple",
      "scientificName": "Annona squamosa",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Berthe_Hoola_van_Nooten53.jpg/960px-Berthe_Hoola_van_Nooten53.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "2-3 years to fruit",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a low level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 48,
      "name": "Sapodilla",
      "scientificName": "Manilkara zapota",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg/960px-%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "All seasons",
      "difficulty": "Medium",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 49,
      "name": "Java Plum",
      "scientificName": "Syzygium cumini",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Syzygium_cumini_Bra30.png/960px-Syzygium_cumini_Bra30.png",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "4-6 years to fruit",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Plant in loamy soil with full sun exposure. Water at a medium level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 50,
      "name": "Olive",
      "scientificName": "Olea europaea",
      "category": "Fruits",
      "image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Olivesfromjordan.jpg",
      "description": "A rewarding fruit plant for home gardens that produces flavorful harvests when given the right sunlight, soil, and watering routine.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "3-5 years to fruit",
      "bestSeason": "Summer",
      "difficulty": "Medium",
      "careInstructions": "Plant in well-drained soil with full sun exposure. Water at a low level, mulch the base, and prune lightly to keep the plant healthy.",
      "fertilizerTips": "Add compost at planting and feed monthly with balanced organic fertilizer during active growth and fruiting.",
      "harvestingTips": "Harvest when fruits reach full size, good color, and a slightly sweet aroma. Pick gently to avoid damaging branches.",
      "commonDiseases": [
        "Fruit fly",
        "Leaf spot",
        "Anthracnose"
      ],
      "preventionTips": "Keep the area clean, prune for airflow, avoid waterlogging, and remove infected leaves or fruits quickly.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Garlic"
      ],
      "avoidNearby": [
        "Walnut",
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 51,
      "name": "Potato",
      "scientificName": "Solanum tuberosum",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/960px-Patates.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "90-120 days",
      "bestSeason": "Winter",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 52,
      "name": "Onion",
      "scientificName": "Allium cepa",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mixed_onions.jpg/960px-Mixed_onions.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-150 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile well-drained soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 53,
      "name": "Garlic",
      "scientificName": "Allium sativum",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Allium_sativum_Woodwill_1793.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "6-8 months",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile well-drained soil with full sun exposure. Keep watering low and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 54,
      "name": "Cauliflower",
      "scientificName": "Brassica oleracea var. botrytis",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Chou-fleur_02.jpg/960px-Chou-fleur_02.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "70-100 days",
      "bestSeason": "Winter",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering high and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 55,
      "name": "Broccoli",
      "scientificName": "Brassica oleracea var. italica",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_and_cross_section_edit.jpg/960px-Broccoli_and_cross_section_edit.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "60-90 days",
      "bestSeason": "Winter",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering high and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 56,
      "name": "Bitter Gourd",
      "scientificName": "Momordica charantia",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Momordica_charantia_Blanco2.357.png/960px-Momordica_charantia_Blanco2.357.png",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "55-70 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 57,
      "name": "Bottle Gourd",
      "scientificName": "Lagenaria siceraria",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Courge_encore_verte.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "60-80 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering high and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 58,
      "name": "Ridge Gourd",
      "scientificName": "Luffa acutangula",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Luffa_acutangula_Chinese_okra.jpg/960px-Luffa_acutangula_Chinese_okra.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "60-75 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering high and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 59,
      "name": "Pumpkin",
      "scientificName": "Cucurbita pepo",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/FrenchMarketPumpkinsB.jpg/960px-FrenchMarketPumpkinsB.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "90-120 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 60,
      "name": "Zucchini",
      "scientificName": "Cucurbita pepo var. cylindrica",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/CSA-Striped-Zucchini.jpg/960px-CSA-Striped-Zucchini.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "45-60 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 61,
      "name": "Green Bean",
      "scientificName": "Phaseolus vulgaris",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Heaps_of_beans.jpg/960px-Heaps_of_beans.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "50-65 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile well-drained soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 62,
      "name": "Pea",
      "scientificName": "Pisum sativum",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Peas_in_pods_-_Studio.jpg/960px-Peas_in_pods_-_Studio.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "60-70 days",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 63,
      "name": "Beetroot",
      "scientificName": "Beta vulgaris",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Detroitdarkredbeets.png/960px-Detroitdarkredbeets.png",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "55-70 days",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 64,
      "name": "Turnip",
      "scientificName": "Brassica rapa subsp. rapa",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Turnip_2622027.jpg/960px-Turnip_2622027.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "45-60 days",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 65,
      "name": "Sweet Potato",
      "scientificName": "Ipomoea batatas",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ipomoea_batatas_006.JPG/960px-Ipomoea_batatas_006.JPG",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "90-120 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile sandy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 66,
      "name": "Corn",
      "scientificName": "Zea mays",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "70-100 days",
      "bestSeason": "Summer",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 67,
      "name": "Bell Pepper",
      "scientificName": "Capsicum annuum Group",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "70-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 68,
      "name": "Red Amaranth",
      "scientificName": "Amaranthus tricolor",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/0/05/Amaranthus_cruentus1.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "25-35 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 69,
      "name": "Kale",
      "scientificName": "Brassica oleracea var. sabellica",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Boerenkool.jpg/960px-Boerenkool.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "55-75 days",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with full sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 70,
      "name": "Swiss Chard",
      "scientificName": "Beta vulgaris subsp. vulgaris",
      "category": "Vegetables",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chard_%28Beta_vulgaris_var_cicla%29.jpg/960px-Chard_%28Beta_vulgaris_var_cicla%29.jpg",
      "description": "A practical edible garden crop that fits well in seasonal beds, containers, and kitchen gardens.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Loamy",
      "growthDuration": "50-60 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Grow in fertile loamy soil with partial sun exposure. Keep watering medium and remove weeds before they compete with young plants.",
      "fertilizerTips": "Mix compost before planting and feed every 2-3 weeks with balanced fertilizer during active growth.",
      "harvestingTips": "Harvest at the tender edible stage. Pick regularly so the plant keeps producing fresh growth.",
      "commonDiseases": [
        "Aphids",
        "Leaf spot",
        "Powdery mildew"
      ],
      "preventionTips": "Rotate crops, maintain spacing, water at soil level, and remove damaged leaves before disease spreads.",
      "companionPlants": [
        "Marigold",
        "Basil",
        "Onion"
      ],
      "avoidNearby": [
        "Fennel",
        "Walnut"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 71,
      "name": "Parsley",
      "scientificName": "Petroselinum crispum",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Petroselinum.jpg/960px-Petroselinum.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "70-90 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with partial sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 72,
      "name": "Thyme",
      "scientificName": "Thymus vulgaris",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Thyme-Bundle.jpg/960px-Thyme-Bundle.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 73,
      "name": "Rosemary",
      "scientificName": "Salvia rosmarinus",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/960px-Rosemary_in_bloom.JPG",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 74,
      "name": "Oregano",
      "scientificName": "Origanum vulgare",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Origanum_vulgare_-_harilik_pune.jpg/960px-Origanum_vulgare_-_harilik_pune.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 75,
      "name": "Sage",
      "scientificName": "Salvia officinalis",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Salvia_officinalis0.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "75-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 76,
      "name": "Dill",
      "scientificName": "Anethum graveolens",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Illustration_Anethum_graveolens_clean.jpg/960px-Illustration_Anethum_graveolens_clean.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "40-60 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 77,
      "name": "Fennel",
      "scientificName": "Foeniculum vulgare",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Foeniculum_July_2011-1a.jpg/960px-Foeniculum_July_2011-1a.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "80-100 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 78,
      "name": "Chives",
      "scientificName": "Allium schoenoprasum",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Allium_schoenoprasum_-_Bombus_lapidarius_-_Tootsi.jpg/960px-Allium_schoenoprasum_-_Bombus_lapidarius_-_Tootsi.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 79,
      "name": "Lemongrass",
      "scientificName": "Cymbopogon citratus",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/YosriNov04Pokok_Serai.JPG",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "90-120 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering high and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 80,
      "name": "Ginger",
      "scientificName": "Zingiber officinale",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Koeh-146-no_text.jpg/960px-Koeh-146-no_text.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "High",
      "sunlight": "Partial Sun",
      "soilType": "Loamy",
      "growthDuration": "8-10 months",
      "bestSeason": "Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with partial sun exposure. Keep watering high and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "heavy"
      }
    },
    {
      "id": 81,
      "name": "Fenugreek",
      "scientificName": "Trigonella foenum-graecum",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Illustration_Trigonella_foenum-graecum0_clean.jpg/960px-Illustration_Trigonella_foenum-graecum0_clean.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "25-40 days",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 82,
      "name": "Curry Leaf",
      "scientificName": "Murraya koenigii",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Curry_Trees.jpg/960px-Curry_Trees.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round growth",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 83,
      "name": "Bay Laurel",
      "scientificName": "Laurus nobilis",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Starr-071024-0195-Laurus_nobilis-leaves-Enchanting_Floral_Gardens_of_Kula-Maui_%2824867859296%29.jpg/960px-Starr-071024-0195-Laurus_nobilis-leaves-Enchanting_Floral_Gardens_of_Kula-Maui_%2824867859296%29.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round growth",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 84,
      "name": "Tarragon",
      "scientificName": "Artemisia dracunculus",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Estragon_1511.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 85,
      "name": "Marjoram",
      "scientificName": "Origanum majorana",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Origanum_majorana_002.JPG/960px-Origanum_majorana_002.JPG",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 86,
      "name": "Chamomile",
      "scientificName": "Matricaria chamomilla",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Kamomillasaunio_%28Matricaria_recutita%29.JPG/960px-Kamomillasaunio_%28Matricaria_recutita%29.JPG",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 87,
      "name": "Stevia",
      "scientificName": "Stevia rebaudiana",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Stevia_plant.jpg/960px-Stevia_plant.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "80-120 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 88,
      "name": "Holy Basil",
      "scientificName": "Ocimum tenuiflorum",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tulsi_or_Tulasi_Holy_basil.jpg/960px-Tulsi_or_Tulasi_Holy_basil.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 89,
      "name": "Aloe Vera",
      "scientificName": "Aloe barbadensis miller",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/960px-Aloe_vera_flower_inset.png",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round growth",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 90,
      "name": "Chervil",
      "scientificName": "Anthriscus cerefolium",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Illustration_Anthriscus_cerefolium0.jpg/960px-Illustration_Anthriscus_cerefolium0.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Loamy",
      "growthDuration": "40-60 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with partial sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 91,
      "name": "Lovage",
      "scientificName": "Levisticum officinale",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Liebst%C3%B6ckel.JPG/960px-Liebst%C3%B6ckel.JPG",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Loamy",
      "growthDuration": "80-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with partial sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 92,
      "name": "Lemon Balm",
      "scientificName": "Melissa officinalis",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lemon_balm_plant.jpg/960px-Lemon_balm_plant.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-70 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with partial sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 93,
      "name": "Catnip",
      "scientificName": "Nepeta cataria",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Catnip_flowers.jpg/960px-Catnip_flowers.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-90 days",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 94,
      "name": "Anise",
      "scientificName": "Pimpinella anisum",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Koehler1887-PimpinellaAnisum.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "100-120 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering medium and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 95,
      "name": "Ajwain",
      "scientificName": "Trachyspermum ammi",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Carom_Flowers.jpg/960px-Carom_Flowers.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "100-120 days",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 96,
      "name": "Moringa",
      "scientificName": "Moringa oleifera",
      "category": "Herbs",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/DrumstickFlower.jpg/960px-DrumstickFlower.jpg",
      "description": "A useful aromatic herb for cooking, home remedies, and small-space gardening.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "Year-round growth",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Use a well-positioned pot or bed with full sun exposure. Keep watering low and trim regularly to encourage fresh growth.",
      "fertilizerTips": "Use light compost or diluted liquid fertilizer once a month; too much fertilizer can reduce aroma and flavor.",
      "harvestingTips": "Harvest young leaves or stems in the morning. Never remove more than one-third of the plant at once.",
      "commonDiseases": [
        "Root rot",
        "Powdery mildew",
        "Aphids"
      ],
      "preventionTips": "Avoid overwatering, keep good airflow, and harvest regularly to prevent weak, crowded growth.",
      "companionPlants": [
        "Tomato",
        "Pepper",
        "Marigold"
      ],
      "avoidNearby": [
        "Fennel"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 97,
      "name": "Hibiscus",
      "scientificName": "Hibiscus rosa-sinensis",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Hibiscus_flower_TZ.jpg/960px-Hibiscus_flower_TZ.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 98,
      "name": "Jasmine",
      "scientificName": "Jasminum sambac",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Common_Jasmine.jpg/960px-Common_Jasmine.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "120-180 days to bloom",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": true,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 99,
      "name": "Dahlia",
      "scientificName": "Dahlia pinnata",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dahlia_x_hybrida.jpg/960px-Dahlia_x_hybrida.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 100,
      "name": "Zinnia",
      "scientificName": "Zinnia elegans",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zinnia_single_layer_and_12_Petals_2.jpg/960px-Zinnia_single_layer_and_12_Petals_2.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-70 days to bloom",
      "bestSeason": "Summer",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 101,
      "name": "Cosmos",
      "scientificName": "Cosmos bipinnatus",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/The_Nights_Long_Moments_%28152181573%29.jpeg/960px-The_Nights_Long_Moments_%28152181573%29.jpeg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-80 days to bloom",
      "bestSeason": "Summer and Autumn",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 102,
      "name": "Petunia",
      "scientificName": "Petunia x atkinsiana",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Pet%C3%BAnia_%28do_tupi_petyma%2C_%27tabaco%27%29.jpg/960px-Pet%C3%BAnia_%28do_tupi_petyma%2C_%27tabaco%27%29.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "70-90 days to bloom",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 103,
      "name": "Geranium",
      "scientificName": "Pelargonium",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Geranium_February_2008-1.jpg/960px-Geranium_February_2008-1.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 104,
      "name": "Bougainvillea",
      "scientificName": "Bougainvillea spectabilis",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bougainvillea_closeup.jpg/960px-Bougainvillea_closeup.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round blooms",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 105,
      "name": "Orchid",
      "scientificName": "Orchidaceae",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Plant_Orchid_Cymbidium_aloifolium_P1110661_05_-_cropped.jpg/960px-Plant_Orchid_Cymbidium_aloifolium_P1110661_05_-_cropped.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round blooms",
      "bestSeason": "All seasons",
      "difficulty": "Advanced",
      "careInstructions": "Grow in well-drained soil with partial sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 106,
      "name": "Lily",
      "scientificName": "Lilium",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lilium_candidum_1.jpg/960px-Lilium_candidum_1.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 107,
      "name": "Tulip",
      "scientificName": "Tulipa",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%9D.JPG/960px-%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%9D.JPG",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cold",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 108,
      "name": "Daffodil",
      "scientificName": "Narcissus",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Narcissus_poeticus_subsp._radiiflorus.1658.jpg/960px-Narcissus_poeticus_subsp._radiiflorus.1658.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 109,
      "name": "Chrysanthemum",
      "scientificName": "Chrysanthemum morifolium",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chrysanthemum_nangkingense.jpg/960px-Chrysanthemum_nangkingense.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Winter",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 110,
      "name": "Lotus",
      "scientificName": "Nelumbo nucifera",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/960px-Sacred_lotus_Nelumbo_nucifera.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Clay",
      "growthDuration": "120-150 days to bloom",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Grow in clay soil with full sun exposure. Water at a high level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "high",
        "rainfall": "heavy"
      }
    },
    {
      "id": 111,
      "name": "Water Lily",
      "scientificName": "Nymphaea",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nymphaea_alba.001_-_Breendonk.jpg/960px-Nymphaea_alba.001_-_Breendonk.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "High",
      "sunlight": "Full Sun",
      "soilType": "Clay",
      "growthDuration": "90-120 days to bloom",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Grow in clay soil with full sun exposure. Water at a high level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "heavy"
      }
    },
    {
      "id": 112,
      "name": "Periwinkle",
      "scientificName": "Catharanthus roseus",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vinca_%28Catharanthus_roseus%29_cultivada_em_Bag%C3%A9%2C_RS%2C_Brasil_-_55231652268.jpg/960px-Vinca_%28Catharanthus_roseus%29_cultivada_em_Bag%C3%A9%2C_RS%2C_Brasil_-_55231652268.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-80 days to bloom",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 113,
      "name": "Portulaca",
      "scientificName": "Portulaca grandiflora",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pink_Portulaca_Flower.jpg/960px-Pink_Portulaca_Flower.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Sandy",
      "growthDuration": "45-60 days to bloom",
      "bestSeason": "Summer",
      "difficulty": "Easy",
      "careInstructions": "Grow in sandy soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 114,
      "name": "Calendula",
      "scientificName": "Calendula officinalis",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Calendula_January_2008-1_filtered.jpg/960px-Calendula_January_2008-1_filtered.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "50-70 days to bloom",
      "bestSeason": "Winter and Spring",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 115,
      "name": "Snapdragon",
      "scientificName": "Antirrhinum majus",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Antirrhinum_majus_BCBG_%2802%29.jpg/960px-Antirrhinum_majus_BCBG_%2802%29.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "80-100 days to bloom",
      "bestSeason": "Winter and Spring",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 116,
      "name": "Pansy",
      "scientificName": "Viola tricolor var. hortensis",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/PansyScan_%28cropped%29.jpg/960px-PansyScan_%28cropped%29.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "70-90 days to bloom",
      "bestSeason": "Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with partial sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 117,
      "name": "Impatiens",
      "scientificName": "Impatiens walleriana",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Impatiens_scapiflora.jpg/960px-Impatiens_scapiflora.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "High",
      "sunlight": "Shade",
      "soilType": "Loamy",
      "growthDuration": "60-90 days to bloom",
      "bestSeason": "Monsoon and Winter",
      "difficulty": "Easy",
      "careInstructions": "Grow in loamy soil with shade exposure. Water at a high level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 118,
      "name": "Begonia",
      "scientificName": "Begonia",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Begonia_obliqua00.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "80-100 days to bloom",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with partial sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 119,
      "name": "Frangipani",
      "scientificName": "Plumeria rubra",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Plumeria_rubra-4.JPG/960px-Plumeria_rubra-4.JPG",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round blooms",
      "bestSeason": "Summer and Monsoon",
      "difficulty": "Medium",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "hot",
        "humidity": "medium",
        "rainfall": "light"
      }
    },
    {
      "id": 120,
      "name": "Gardenia",
      "scientificName": "Gardenia jasminoides",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Gardeniaflower.jpg/960px-Gardeniaflower.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "120-180 days to bloom",
      "bestSeason": "Spring and Summer",
      "difficulty": "Advanced",
      "careInstructions": "Grow in well-drained soil with partial sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "moderate"
      }
    },
    {
      "id": 121,
      "name": "Magnolia",
      "scientificName": "Magnolia grandiflora",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Magnolia_sieboldii_flower_1.jpg/960px-Magnolia_sieboldii_flower_1.jpg",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Medium",
      "sunlight": "Full Sun",
      "soilType": "Loamy",
      "growthDuration": "2-3 years to bloom",
      "bestSeason": "Spring and Summer",
      "difficulty": "Advanced",
      "careInstructions": "Grow in loamy soil with full sun exposure. Water at a medium level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 122,
      "name": "Verbena",
      "scientificName": "Verbena officinalis",
      "category": "Flowers",
      "image": "https://upload.wikimedia.org/wikipedia/commons/3/38/Eisenkraut%2C_Passau.JPG",
      "description": "A beautiful flowering plant that adds color, fragrance, and pollinator-friendly value to the garden.",
      "waterRequirement": "Low",
      "sunlight": "Full Sun",
      "soilType": "Well-drained",
      "growthDuration": "60-80 days to bloom",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Grow in well-drained soil with full sun exposure. Water at a low level and remove faded blooms to encourage fresh flowering.",
      "fertilizerTips": "Apply compost and a balanced bloom fertilizer every 3-4 weeks during the flowering season.",
      "harvestingTips": "Cut blooms early in the morning for best vase life, or deadhead spent flowers to extend the blooming period.",
      "commonDiseases": [
        "Powdery mildew",
        "Aphids",
        "Root rot"
      ],
      "preventionTips": "Provide proper spacing, avoid wet leaves at night, and remove dead flowers or diseased foliage promptly.",
      "companionPlants": [
        "Basil",
        "Garlic",
        "Mint"
      ],
      "avoidNearby": [
        "Overcrowded shrubs"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 123,
      "name": "ZZ Plant",
      "scientificName": "Zamioculcas zamiifolia",
      "category": "Indoor",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Zamioculcas_zamiifolia_1.jpg/960px-Zamioculcas_zamiifolia_1.jpg",
      "description": "An extremely hardy indoor plant with shiny, dark green leaves that thrives on neglect.",
      "waterRequirement": "Low",
      "sunlight": "Shade",
      "soilType": "Well-drained",
      "growthDuration": "Slow grower",
      "bestSeason": "All seasons",
      "difficulty": "Easy",
      "careInstructions": "Allow the soil to dry out completely between waterings. Place in low to medium indirect light.",
      "fertilizerTips": "Apply a balanced liquid fertilizer once or twice during the growing season (spring and summer).",
      "harvestingTips": "Wipe the leaves regularly with a damp cloth to remove dust and maintain their signature shine.",
      "commonDiseases": [
        "Root rot",
        "Mealybugs"
      ],
      "preventionTips": "Never let the plant sit in water. Use well-draining potting mix and pots with drainage holes.",
      "companionPlants": [
        "Snake Plant",
        "Pothos"
      ],
      "avoidNearby": [
        "High-humidity terrariums"
      ],
      "isFeatured": true,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "low",
        "rainfall": "light"
      }
    },
    {
      "id": 124,
      "name": "Peace Lily",
      "scientificName": "Spathiphyllum",
      "category": "Indoor",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/960px-Spathiphyllum_cochlearispathum_RTBG.jpg",
      "description": "An elegant indoor plant with glossy green leaves and beautiful white spathe blossoms that helps purify the air.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "Year-round growth",
      "bestSeason": "Spring and Summer",
      "difficulty": "Easy",
      "careInstructions": "Water when leaves start to droop slightly. Keep in partial sun or indirect bright light.",
      "fertilizerTips": "Feed every 6 weeks in spring and summer with a balanced organic houseplant fertilizer.",
      "harvestingTips": "Trim faded flowers at the base of their stems to encourage new blooms.",
      "commonDiseases": [
        "Root rot",
        "Spider mites"
      ],
      "preventionTips": "Avoid overwatering. Ensure the pot has excellent drainage and mist the leaves occasionally to increase humidity.",
      "companionPlants": [
        "Pothos",
        "Philodendron"
      ],
      "avoidNearby": [
        "Cold drafts"
      ],
      "isFeatured": false,
      "isBeginner": true,
      "isLowMaintenance": true,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    },
    {
      "id": 125,
      "name": "Hydrangea",
      "scientificName": "Hydrangea macrophylla",
      "category": "Outdoor",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Hydrangea_arborescens_139866012.jpg/960px-Hydrangea_arborescens_139866012.jpg",
      "description": "A stunning outdoor shrub famous for its large, globe-shaped flower clusters that change color based on soil pH.",
      "waterRequirement": "High",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "Summer bloomer",
      "bestSeason": "Spring and Summer",
      "difficulty": "Medium",
      "careInstructions": "Keep the soil consistently moist but not waterlogged. Plant in a spot with morning sun and afternoon shade.",
      "fertilizerTips": "Apply an organic fertilizer formulated for acid-loving plants to encourage blue blooms, or alkaline for pink blooms.",
      "harvestingTips": "Cut blooms for floral arrangements when the flowers are fully colored and open.",
      "commonDiseases": [
        "Powdery mildew",
        "Leaf spot"
      ],
      "preventionTips": "Water at the base of the plant to avoid wetting the leaves. Prune only after the flowering season.",
      "companionPlants": [
        "Hostas",
        "Ferns"
      ],
      "avoidNearby": [
        "Drought-prone areas"
      ],
      "isFeatured": true,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "warm",
        "humidity": "high",
        "rainfall": "heavy"
      }
    },
    {
      "id": 126,
      "name": "Japanese Maple",
      "scientificName": "Acer palmatum",
      "category": "Outdoor",
      "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Acer_palmatum0.jpg",
      "description": "An exquisite outdoor ornamental tree prized for its delicate, lacy leaves and spectacular autumn foliage colors.",
      "waterRequirement": "Medium",
      "sunlight": "Partial Sun",
      "soilType": "Well-drained",
      "growthDuration": "Slow-growing tree",
      "bestSeason": "Spring and Autumn",
      "difficulty": "Medium",
      "careInstructions": "Plant in sheltered areas to protect the delicate leaves from strong winds. Keep the soil evenly moist.",
      "fertilizerTips": "Apply a slow-release fertilizer in early spring. Avoid heavy fertilizing, which can ruin leaf color.",
      "harvestingTips": "Prune during late winter or early spring to shape the tree and remove dead wood.",
      "commonDiseases": [
        "Verticillium wilt",
        "Aphids"
      ],
      "preventionTips": "Ensure excellent soil drainage and avoid mechanical damage to the trunk. Mulch the root zone to keep roots cool.",
      "companionPlants": [
        "Azaleas",
        "Rhododendrons"
      ],
      "avoidNearby": [
        "High-traffic windy areas"
      ],
      "isFeatured": true,
      "isBeginner": false,
      "isLowMaintenance": false,
      "weatherPreference": {
        "temperature": "cool",
        "humidity": "medium",
        "rainfall": "moderate"
      }
    }
];

export const gardenTips = [
  "Water your plants early in the morning to reduce evaporation and prevent fungal diseases.",
  "Mulch around plants to retain moisture, regulate soil temperature, and suppress weeds.",
  "Rotate your crops each season to prevent soil depletion and reduce pest buildup.",
  "Companion planting can help deter pests and improve plant growth naturally.",
  "Remove dead or diseased leaves immediately to prevent spread of diseases.",
  "Test your soil pH regularly to ensure optimal nutrient availability for plants.",
  "Compost kitchen scraps to create nutrient-rich organic fertilizer for your garden.",
  "Deadhead flowers regularly to encourage more blooms and extend flowering period.",
  "Group plants with similar water and sunlight needs together for easier care.",
  "Use organic pest control methods like neem oil and companion planting before chemicals."
];
