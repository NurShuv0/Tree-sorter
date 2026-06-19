import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, Sprout, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PlantCard } from '../components/PlantCard';
import { WeatherCard } from '../components/WeatherCard';
import { CategoryCard } from '../components/CategoryCard';
import { DailyTip } from '../components/DailyTip';
import { plants } from '../../data/plants';
import { getMockWeather } from '../../lib/recommendations';
import { getFavorites, toggleFavorite } from '../../lib/favorites';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function HomePage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const weather = getMockWeather();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (plantId: number) => {
    const isFav = toggleFavorite(plantId);
    setFavorites(getFavorites());
    toast.success(isFav ? 'Added to favorites!' : 'Removed from favorites');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/plants?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const featuredPlants = plants.filter(p => p.isFeatured).slice(0, 6);
  const beginnerPlants = plants.filter(p => p.isBeginner).slice(0, 4);

  const categoryCounts = {
    Fruits: plants.filter(p => p.category === 'Fruits').length,
    Vegetables: plants.filter(p => p.category === 'Vegetables').length,
    Flowers: plants.filter(p => p.category === 'Flowers').length,
    Herbs: plants.filter(p => p.category === 'Herbs').length,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJFN0QzMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Sprout className="size-5 text-primary" />
              <span className="text-sm font-medium text-primary">Tree Sorter Made Easy</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Find the Perfect Plant
              <br />
              <span className="text-primary">for Your Garden</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the best plants based on season, weather, sunlight, water needs, and care difficulty.
              Start your gardening journey today!
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for plants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base bg-white dark:bg-card"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8">
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/plants">
                <Button size="lg" variant="default">
                  Explore Plants
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/weather">
                <Button size="lg" variant="outline">
                  Weather Suggestions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Weather Widget */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <WeatherCard weather={weather} />
            <DailyTip />
          </div>
        </section>

        {/* Category Shortcuts */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-foreground">Browse by Category</h2>
            <p className="text-muted-foreground">Explore plants by type and find what suits your garden best</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryCard title="Fruits" emoji="🍎" count={categoryCounts.Fruits} category="Fruits" />
            <CategoryCard title="Vegetables" emoji="🥕" count={categoryCounts.Vegetables} category="Vegetables" />
            <CategoryCard title="Flowers" emoji="🌸" count={categoryCounts.Flowers} category="Flowers" />
            <CategoryCard title="Herbs" emoji="🌿" count={categoryCounts.Herbs} category="Herbs" />
          </div>
        </section>

        {/* Featured Plants */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Featured Plants</h2>
              <p className="text-muted-foreground">Popular plants loved by gardeners</p>
            </div>
            <Link to="/plants">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                isFavorite={favorites.includes(plant.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Beginner Friendly Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Beginner Friendly</h2>
              <p className="text-muted-foreground">Perfect plants to start your gardening journey</p>
            </div>
            <Link to="/plants?difficulty=Easy">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beginnerPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                isFavorite={favorites.includes(plant.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-foreground">Why Use Tree Sorter?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to grow a thriving garden, all in one place
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-card rounded-2xl border-2 hover:border-primary/50 transition-colors"
            >
              <div className="text-5xl mb-4">🌤️</div>
              <h3 className="font-semibold text-xl mb-2">Weather-Based Recommendations</h3>
              <p className="text-muted-foreground">
                Get plant suggestions tailored to your local weather and season
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-card rounded-2xl border-2 hover:border-primary/50 transition-colors"
            >
              <div className="text-5xl mb-4">📚</div>
              <h3 className="font-semibold text-xl mb-2">Detailed Care Guides</h3>
              <p className="text-muted-foreground">
                Learn exactly how to care for each plant with step-by-step instructions
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-card rounded-2xl border-2 hover:border-primary/50 transition-colors"
            >
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-semibold text-xl mb-2">Smart Filtering</h3>
              <p className="text-muted-foreground">
                Filter by water needs, sunlight, soil type, and difficulty level
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
