import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { PlantsPage } from './pages/PlantsPage';
import { PlantDetailsPage } from './pages/PlantDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { WeatherPage } from './pages/WeatherPage';
import { Navbar } from './components/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/plants',
    element: (
      <Layout>
        <PlantsPage />
      </Layout>
    ),
  },
  {
    path: '/plants/:id',
    element: (
      <Layout>
        <PlantDetailsPage />
      </Layout>
    ),
  },
  {
    path: '/favorites',
    element: (
      <Layout>
        <FavoritesPage />
      </Layout>
    ),
  },
  {
    path: '/weather',
    element: (
      <Layout>
        <WeatherPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-6">Page not found</p>
            <a href="/" className="text-primary hover:underline">
              Go back home
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);
