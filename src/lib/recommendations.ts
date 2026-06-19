import { Plant } from '../data/plants';

export interface WeatherData {
  temperature: number; // in Celsius
  humidity: number; // percentage
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  location: string;
  season: 'spring' | 'summer' | 'monsoon' | 'winter';
}

export function getRecommendedPlants(plants: Plant[], weather: WeatherData): Plant[] {
  return plants.filter(plant => {
    // Temperature-based filtering
    if (weather.temperature > 30) {
      // Hot weather
      if (plant.weatherPreference.temperature === 'cool' || plant.weatherPreference.temperature === 'cold') {
        return false;
      }
    } else if (weather.temperature < 15) {
      // Cool weather
      if (plant.weatherPreference.temperature === 'hot') {
        return false;
      }
    }

    // Humidity-based filtering
    if (weather.humidity > 70 && plant.weatherPreference.humidity === 'low') {
      return false;
    }
    if (weather.humidity < 40 && plant.weatherPreference.humidity === 'high') {
      return false;
    }

    // Rainfall/condition-based filtering
    if (weather.condition === 'rainy' && plant.waterRequirement === 'Low') {
      // Low water plants may not like constant rain
      return false;
    }

    // Season-based filtering
    const seasonMatch = plant.bestSeason.toLowerCase().includes(weather.season);
    if (!seasonMatch && !plant.bestSeason.toLowerCase().includes('all')) {
      return false;
    }

    return true;
  }).slice(0, 6); // Return top 6 recommendations
}

export function getWeatherRecommendationReason(plant: Plant, weather: WeatherData): string {
  const reasons: string[] = [];

  if (weather.temperature > 30 && (plant.weatherPreference.temperature === 'hot' || plant.weatherPreference.temperature === 'warm')) {
    reasons.push('thrives in hot weather');
  } else if (weather.temperature < 15 && plant.weatherPreference.temperature === 'cool') {
    reasons.push('perfect for cool conditions');
  }

  if (weather.humidity > 70 && plant.weatherPreference.humidity === 'high') {
    reasons.push('loves high humidity');
  }

  if (weather.condition === 'rainy' && plant.waterRequirement === 'High') {
    reasons.push('benefits from abundant rainfall');
  } else if (weather.condition === 'sunny' && plant.sunlight === 'Full Sun') {
    reasons.push('needs plenty of sunlight');
  }

  if (plant.bestSeason.toLowerCase().includes(weather.season)) {
    reasons.push(`ideal for ${weather.season} planting`);
  }

  return reasons.length > 0
    ? `This plant ${reasons.join(' and ')}.`
    : 'This plant is well-suited to current conditions.';
}

export function getWeatherCareTip(plant: Plant, weather: WeatherData): string {
  if (weather.condition === 'rainy') {
    return plant.waterRequirement === 'Low'
      ? 'Ensure good drainage during rainy season to prevent root rot.'
      : 'Monitor soil moisture and reduce manual watering during rainy days.';
  }

  if (weather.temperature > 30) {
    return 'Water early morning or late evening. Mulch to retain moisture and keep roots cool.';
  }

  if (weather.temperature < 15) {
    return 'Protect from frost if needed. Water less frequently in cool weather.';
  }

  if (weather.humidity < 40) {
    return 'Increase watering frequency and consider misting leaves in dry conditions.';
  }

  return plant.careInstructions;
}

// Mock weather data generator for demo
export function getMockWeather(): WeatherData {
  const currentMonth = new Date().getMonth();
  let season: 'spring' | 'summer' | 'monsoon' | 'winter';
  let temperature: number;
  let humidity: number;
  let condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';

  // Determine season based on month (Bangladesh/South Asian climate)
  if (currentMonth >= 2 && currentMonth <= 4) {
    season = 'summer';
    temperature = 32 + Math.random() * 6; // 32-38°C
    humidity = 60 + Math.random() * 20;
    condition = 'sunny';
  } else if (currentMonth >= 5 && currentMonth <= 8) {
    season = 'monsoon';
    temperature = 28 + Math.random() * 4; // 28-32°C
    humidity = 75 + Math.random() * 20;
    condition = Math.random() > 0.5 ? 'rainy' : 'cloudy';
  } else if (currentMonth >= 9 && currentMonth <= 10) {
    season = 'winter';
    temperature = 20 + Math.random() * 5; // 20-25°C
    humidity = 50 + Math.random() * 20;
    condition = 'sunny';
  } else {
    season = 'winter';
    temperature = 15 + Math.random() * 8; // 15-23°C
    humidity = 40 + Math.random() * 20;
    condition = 'cloudy';
  }

  return {
    temperature: Math.round(temperature),
    humidity: Math.round(humidity),
    condition,
    location: 'Your Location',
    season
  };
}
