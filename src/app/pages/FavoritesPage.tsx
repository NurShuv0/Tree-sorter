import { useState, useEffect } from 'react';
import { PlantCard } from '../components/PlantCard';
import { EmptyState } from '../components/EmptyState';
import { plants } from '../../data/plants';
import { getFavorites, toggleFavorite } from '../../lib/favorites';
import { toast } from 'sonner';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (plantId: number) => {
    const isFav = toggleFavorite(plantId);
    setFavorites(getFavorites());
    toast.success(isFav ? 'Added to favorites!' : 'Removed from favorites');
  };

  const favoritePlants = plants.filter((plant) => favorites.includes(plant.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">My Favorites</h1>
          <p className="text-muted-foreground">
            {favoritePlants.length > 0
              ? `You have ${favoritePlants.length} favorite ${favoritePlants.length === 1 ? 'plant' : 'plants'}`
              : 'No favorites yet'}
          </p>
        </div>

        {/* Favorites Grid */}
        {favoritePlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoritePlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🌱"
            title="No favorites yet"
            description="Start exploring plants and save your favorites here to keep track of the ones you love."
            actionLabel="Browse Plants"
            actionLink="/plants"
          />
        )}
      </div>
    </div>
  );
}
