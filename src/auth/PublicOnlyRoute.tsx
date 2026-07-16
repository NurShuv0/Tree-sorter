import { Navigate, Outlet } from 'react-router';
import { useAuth } from './useAuth';

/**
 * Wraps routes that should only be accessible to unauthenticated users
 * (e.g. /login, /register).
 *
 * Behaviour:
 * - While initializing: render the outlet (to avoid redirect loops before
 *   session is known).
 * - Authenticated: redirect to home.
 * - Unauthenticated: render the child route.
 *
 * Note: /forgot-password and /reset-password are NOT wrapped in this guard
 * because a logged-in user should still be able to follow a reset link.
 */
export function PublicOnlyRoute() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (!isInitializing && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
