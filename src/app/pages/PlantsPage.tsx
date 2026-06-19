import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { PlantCard } from '../components/PlantCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { EmptyState } from '../components/EmptyState';
import { plants } from '../../data/plants';
import { getFavorites, toggleFavorite } from '../../lib/favorites';
import { toast } from 'sonner';

type SortOption = 'recommended' | 'beginner' | 'fast' | 'low-maintenance';

export function PlantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    waterRequirements: [],
    sunlightLevels: [],
    soilTypes: [],
    difficulties: searchParams.get('difficulty') ? [searchParams.get('difficulty')!] : [],
  });

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (plantId: number) => {
    const isFav = toggleFavorite(plantId);
    setFavorites(getFavorites());
    toast.success(isFav ? 'Added to favorites!' : 'Removed from favorites');
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => {
      const currentFilter = prev[filterType as keyof typeof prev] as string[];
      const newFilter = currentFilter.includes(value)
        ? currentFilter.filter((v) => v !== value)
        : [...currentFilter, value];
      return { ...prev, [filterType]: newFilter };
    });
  };

  // Apply filters
  let filteredPlants = plants.filter((plant) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        plant.name.toLowerCase().includes(query) ||
        plant.scientificName.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query) ||
        plant.category.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(plant.category)) {
      return false;
    }

    // Water requirement filter
    if (filters.waterRequirements.length > 0 && !filters.waterRequirements.includes(plant.waterRequirement)) {
      return false;
    }

    // Sunlight filter
    if (filters.sunlightLevels.length > 0 && !filters.sunlightLevels.includes(plant.sunlight)) {
      return false;
    }

    // Soil type filter
    if (filters.soilTypes.length > 0 && !filters.soilTypes.includes(plant.soilType)) {
      return false;
    }

    // Difficulty filter
    if (filters.difficulties.length > 0 && !filters.difficulties.includes(plant.difficulty)) {
      return false;
    }

    return true;
  });

  // Apply sorting
  filteredPlants = [...filteredPlants].sort((a, b) => {
    switch (sortBy) {
      case 'beginner':
        return (b.isBeginner ? 1 : 0) - (a.isBeginner ? 1 : 0);
      case 'fast':
        // Simple heuristic: sort by growth duration (lower days first)
        const aDays = parseInt(a.growthDuration) || 999;
        const bDays = parseInt(b.growthDuration) || 999;
        return aDays - bDays;
      case 'low-maintenance':
        return (b.isLowMaintenance ? 1 : 0) - (a.isLowMaintenance ? 1 : 0);
      case 'recommended':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Browse Plants</h1>
          <p className="text-muted-foreground">
            Showing {filteredPlants.length} of {plants.length} plants
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="beginner">Beginner Friendly</SelectItem>
                    <SelectItem value="fast">Fast Growing</SelectItem>
                    <SelectItem value="low-maintenance">Low Maintenance</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                      <SlidersHorizontal className="size-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Plant Grid */}
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    isFavorite={favorites.includes(plant.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="🔍"
                title="No plants found"
                description="Try adjusting your filters or search query to find more plants."
                actionLabel="Clear Filters"
                actionLink="/plants"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
