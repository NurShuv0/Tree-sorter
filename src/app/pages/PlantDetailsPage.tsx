import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  ArrowLeft,
  Heart,
  Droplet,
  Sun,
  Clock,
  Sprout,
  Calendar,
  AlertTriangle,
  Shield,
  Users,
  Ban,
  Flower2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { plants } from '../../data/plants';
import { getFavorites, toggleFavorite } from '../../lib/favorites';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function PlantDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [favorites, setFavorites] = useState<number[]>([]);
  const plant = plants.find((p) => p.id === Number(id));

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = () => {
    if (!plant) return;
    const isFav = toggleFavorite(plant.id);
    setFavorites(getFavorites());
    toast.success(isFav ? 'Added to favorites!' : 'Removed from favorites');
  };

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Plant not found</h2>
          <Link to="/plants">
            <Button>Back to Plants</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(plant.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-96 bg-muted">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Link to="/plants">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              Back to Plants
            </Button>
          </Link>

          {/* Plant Header Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-foreground">{plant.name}</h1>
                    <Badge variant="secondary" className="text-base">
                      {plant.category}
                    </Badge>
                    {plant.isBeginner && (
                      <Badge className="bg-primary text-primary-foreground">
                        Beginner Friendly
                      </Badge>
                    )}
                    {plant.isLowMaintenance && (
                      <Badge variant="outline">Low Maintenance</Badge>
                    )}
                  </div>
                  <p className="text-lg italic text-muted-foreground mb-4">
                    {plant.scientificName}
                  </p>
                  <p className="text-base text-foreground leading-relaxed">
                    {plant.description}
                  </p>
                </div>
                <Button
                  size="lg"
                  variant={isFavorite ? 'default' : 'outline'}
                  onClick={handleToggleFavorite}
                  className="flex-shrink-0"
                >
                  <Heart
                    className={`mr-2 size-5 ${isFavorite ? 'fill-current' : ''}`}
                  />
                  {isFavorite ? 'Saved' : 'Save to Favorites'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Droplet className="size-8 text-primary mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">Water Need</div>
                <div className="font-semibold">{plant.waterRequirement}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Sun className="size-8 text-primary mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">Sunlight</div>
                <div className="font-semibold">{plant.sunlight}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="size-8 text-primary mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">Growth Time</div>
                <div className="font-semibold">{plant.growthDuration}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Sprout className="size-8 text-primary mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">Difficulty</div>
                <div className="font-semibold">{plant.difficulty}</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Growing Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flower2 className="size-5 text-primary" />
                  Growing Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-1">Soil Type</div>
                  <p className="text-muted-foreground">{plant.soilType}</p>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-semibold mb-1">Best Season</div>
                  <p className="text-muted-foreground">{plant.bestSeason}</p>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-semibold mb-1">Care Difficulty</div>
                  <p className="text-muted-foreground">{plant.difficulty}</p>
                </div>
              </CardContent>
            </Card>

            {/* Care Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  Care Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {plant.careInstructions}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Fertilizer Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="size-5 text-primary" />
                  Fertilizer Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {plant.fertilizerTips}
                </p>
              </CardContent>
            </Card>

            {/* Harvesting Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5 text-primary" />
                  Harvesting Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {plant.harvestingTips}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Diseases and Prevention */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-destructive" />
                  Common Diseases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plant.commonDiseases.map((disease, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">{disease}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5 text-primary" />
                  Prevention Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {plant.preventionTips}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Companion Planting */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5 text-primary" />
                  Companion Plants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {plant.companionPlants.map((companion, index) => (
                    <Badge key={index} variant="secondary">
                      {companion}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  These plants grow well together and can benefit each other
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ban className="size-5 text-destructive" />
                  Avoid Planting Near
                </CardTitle>
              </CardHeader>
              <CardContent>
                {plant.avoidNearby.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {plant.avoidNearby.map((avoid, index) => (
                        <Badge key={index} variant="destructive">
                          {avoid}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      These plants may compete for resources or harm growth
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    No specific plants to avoid
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pb-12">
            <Button size="lg" onClick={handleToggleFavorite}>
              <Heart className={`mr-2 size-5 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
            <Link to="/plants">
              <Button size="lg" variant="outline">
                Browse More Plants
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
