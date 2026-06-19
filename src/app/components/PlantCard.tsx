import { Heart, Droplet, Sun, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plant } from '../../data/plants';
import { motion } from 'motion/react';

interface PlantCardProps {
  plant: Plant;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function PlantCard({ plant, isFavorite, onToggleFavorite }: PlantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full size-9 bg-white/90 hover:bg-white shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(plant.id);
            }}
          >
            <Heart
              className={`size-5 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`}
            />
          </Button>
          
          {plant.isBeginner && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Beginner Friendly
            </Badge>
          )}
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg text-foreground">{plant.name}</h3>
              <p className="text-xs text-muted-foreground italic">{plant.scientificName}</p>
            </div>
            <Badge variant="secondary">{plant.category}</Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {plant.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
              <Droplet className="size-3 text-primary" />
              <span>{plant.waterRequirement}</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
              <Sun className="size-3 text-primary" />
              <span>{plant.sunlight}</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
              <Clock className="size-3 text-primary" />
              <span>{plant.growthDuration}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Link to={`/plants/${plant.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
