import { createBrowserRouter, Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { PublicOnlyRoute } from '@/auth/PublicOnlyRoute';

// Existing pages
import { HomePage } from './pages/HomePage';
import { PlantsPage } from './pages/PlantsPage';
import { PlantDetailsPage } from './pages/PlantDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { WeatherPage } from './pages/WeatherPage';
import { TreeAssistantPage } from './pages/TreeAssistantPage';
import { DiseaseScanPage } from './pages/DiseaseScanPage';

// Auth pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProfilePage } from './pages/ProfilePage';

/** Main application layout: sticky navbar + page content via Outlet. */
function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  // ── Public routes with Navbar ──────────────────────────────────────────
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/plants', element: <PlantsPage /> },
      { path: '/plants/:id', element: <PlantDetailsPage /> },
      { path: '/weather', element: <WeatherPage /> },

      // Password reset is accessible regardless of auth state (follow a link).
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },

      // ── Protected routes (require authentication) ──────────────────────
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/favorites', element: <FavoritesPage /> },
          { path: '/tree-assistant', element: <TreeAssistantPage /> },
          { path: '/disease-scan', element: <DiseaseScanPage /> },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },

      // ── 404 ───────────────────────────────────────────────────────────
      {
        path: '*',
        element: (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-6">Page not found</p>
              <a href="/" className="text-primary hover:underline">
                Go back home
              </a>
            </div>
          </div>
        ),
      },
    ],
  },

  // ── Auth routes (no Navbar, redirect authenticated users away) ─────────
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
]);
