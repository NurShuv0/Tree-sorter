import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './authTypes';

/**
 * Hook to access the authentication context.
 * Must be used inside <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return ctx;
}
