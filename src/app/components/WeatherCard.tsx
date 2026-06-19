import { Cloud, CloudRain, CloudSnow, Sun, MapPin, Droplets, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { WeatherData } from '../../lib/recommendations';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="size-12 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="size-12 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="size-12 text-blue-500" />;
      case 'stormy':
        return <CloudSnow className="size-12 text-purple-500" />;
      default:
        return <Sun className="size-12 text-yellow-500" />;
    }
  };

  const getSeasonEmoji = () => {
    switch (weather.season) {
      case 'spring':
        return '🌸';
      case 'summer':
        return '☀️';
      case 'monsoon':
        return '🌧️';
      case 'winter':
        return '❄️';
      default:
        return '🌱';
    }
  };

  return (
    <Card className="border-2 hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPin className="size-4 text-primary" />
          {weather.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {getWeatherIcon()}
            <div>
              <div className="text-4xl font-bold text-foreground">
                {weather.temperature}°C
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {weather.condition}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
            <Droplets className="size-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Humidity</div>
              <div className="font-semibold">{weather.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
            <Thermometer className="size-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Season</div>
              <div className="font-semibold capitalize">
                {getSeasonEmoji()} {weather.season}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
