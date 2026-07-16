import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './useAuth';
import { AuthLoadingScreen } from '@/app/components/auth/AuthLoadingScreen';

/**
 * Wraps routes that require authentication.
 *
 * Behaviour:
 * - While auth is initializing: shows a loading screen (prevents flash of
 *   protected content before tokens have been validated).
 * - Unauthenticated: redirects to /login, preserving the intended route in
 *   location.state so the login page can redirect back after success.
 * - Authenticated: renders the child route via <Outlet />.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
