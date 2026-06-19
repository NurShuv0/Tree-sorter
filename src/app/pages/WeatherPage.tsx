import { useState, useEffect } from 'react';
import { Droplet, Sun, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { WeatherCard } from '../components/WeatherCard';
import { PlantCard } from '../components/PlantCard';
import { Badge } from '../components/ui/badge';
import { plants } from '../../data/plants';
import { getMockWeather, getRecommendedPlants, getWeatherRecommendationReason, getWeatherCareTip } from '../../lib/recommendations';
import { getFavorites, toggleFavorite } from '../../lib/favorites';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function WeatherPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const weather = getMockWeather();
  const recommendedPlants = getRecommendedPlants(plants, weather);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (plantId: number) => {
    const isFav = toggleFavorite(plantId);
    setFavorites(getFavorites());
    toast.success(isFav ? 'Added to favorites!' : 'Removed from favorites');
  };

  const getSeasonalAdvice = () => {
    switch (weather.season) {
      case 'spring':
        return 'Spring is the perfect time to start many vegetables and flowers. Prepare your soil and start planting cool-season crops.';
      case 'summer':
        return 'Summer heat is ideal for heat-loving plants like tomatoes, peppers, and okra. Ensure adequate watering during hot days.';
      case 'monsoon':
        return 'Monsoon brings abundant rainfall. Focus on plants that thrive in high humidity and ensure proper drainage to prevent root rot.';
      case 'winter':
        return 'Winter is great for cool-season vegetables like cabbage, carrot, and lettuce. Protect sensitive plants from frost.';
      default:
        return 'Choose plants based on your current weather conditions for best results.';
    }
  };

  const getWateringAdvice = () => {
    if (weather.condition === 'rainy') {
      return 'With current rainfall, reduce manual watering. Ensure good drainage to prevent waterlogging.';
    }
    if (weather.temperature > 30) {
      return 'In hot weather, water plants early morning or late evening. Mulch to retain moisture.';
    }
    if (weather.humidity < 40) {
      return 'Low humidity means faster evaporation. Water more frequently and consider misting leaves.';
    }
    return 'Maintain consistent watering schedule based on plant needs. Check soil moisture before watering.';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Weather-Based Recommendations</h1>
          <p className="text-muted-foreground">
            Plants perfectly suited to your current weather conditions
          </p>
        </div>

        {/* Weather Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <WeatherCard weather={weather} />
          </div>

          <div className="md:col-span-2 grid gap-6">
            {/* Seasonal Advice */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="p-2 bg-primary rounded-full">
                    <TrendingUp className="size-4 text-primary-foreground" />
                  </div>
                  Seasonal Gardening Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{getSeasonalAdvice()}</p>
              </CardContent>
            </Card>

            {/* Watering Advice */}
            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="p-2 bg-secondary rounded-full">
                    <Droplet className="size-4 text-secondary-foreground" />
                  </div>
                  Watering Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{getWateringAdvice()}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Plants */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-foreground">Recommended Plants</h2>
            <Badge variant="secondary" className="text-sm">
              {recommendedPlants.length} plants
            </Badge>
          </div>

          {recommendedPlants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedPlants.map((plant) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-full">
                    <PlantCard
                      plant={plant}
                      isFavorite={favorites.includes(plant.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                    
                    {/* Recommendation Details */}
                    <Card className="mt-3 border-primary/30 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2 mb-3">
                          <Lightbulb className="size-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground">
                            {getWeatherRecommendationReason(plant, weather)}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Droplet className="size-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {getWeatherCareTip(plant, weather)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Limited Recommendations</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Current weather conditions are challenging. Check our full plant catalog for more options.
              </p>
            </Card>
          )}
        </div>

        {/* Weather Tips Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="size-5 text-primary" />
                Sunlight Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {weather.condition === 'sunny'
                  ? 'Full sun conditions are ideal for sun-loving plants. Make sure to provide shade for partial sun plants during peak hours.'
                  : weather.condition === 'cloudy'
                  ? 'Cloudy conditions provide natural shade. Good time for transplanting and caring for shade-loving plants.'
                  : 'Limited sunlight due to rain. Ensure plants get enough light once weather clears.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {weather.condition === 'sunny' ? (
                  <>
                    <Badge>Full Sun Plants</Badge>
                    <Badge variant="outline">Tomato</Badge>
                    <Badge variant="outline">Sunflower</Badge>
                    <Badge variant="outline">Okra</Badge>
                  </>
                ) : (
                  <>
                    <Badge>Partial Shade Plants</Badge>
                    <Badge variant="outline">Mint</Badge>
                    <Badge variant="outline">Lettuce</Badge>
                    <Badge variant="outline">Spinach</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="size-5 text-primary" />
                Moisture Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {weather.humidity > 70
                  ? 'High humidity levels reduce evaporation. Water less frequently and ensure good air circulation to prevent fungal diseases.'
                  : weather.humidity < 40
                  ? 'Low humidity increases water loss. Increase watering frequency and consider mulching to retain soil moisture.'
                  : 'Moderate humidity is ideal for most plants. Maintain regular watering schedule.'}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Humidity</span>
                  <span className="font-semibold">{weather.humidity}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${weather.humidity}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
