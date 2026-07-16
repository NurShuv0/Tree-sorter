/**
 * Authentication context and provider.
 *
 * Startup sequence:
 * 1. Check for stored tokens.
 * 2. If none → mark initialized (unauthenticated).
 * 3. If tokens exist → call GET /api/auth/me/.
 * 4. On 401 the apiClient automatically attempts refresh; if that fails it
 *    clears tokens and throws – we catch that and mark as unauthenticated.
 * 5. On success → store user, mark authenticated and initialized.
 */

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';

import { authApi } from '@/api/authApi';
import {
  clearTokens,
  getRefreshToken,
  hasStoredSession,
  setTokens,
} from '@/auth/authStorage';
import type {
  AuthContextValue,
  AuthUser,
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
} from '@/auth/authTypes';

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initRan = useRef(false);

  // ── Session restore on mount ────────────────────────────────────────────────

  useEffect(() => {
    if (initRan.current) return;
    initRan.current = true;

    if (!hasStoredSession()) {
      setIsInitializing(false);
      return;
    }

    authApi
      .getCurrentUser()
      .then((res) => setUser(res.user))
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => setIsInitializing(false));
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const refreshCurrentUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const res = await authApi.getCurrentUser();
      setUser(res.user);
      return res.user;
    } catch {
      return null;
    }
  }, []);

  // ── Login ───────────────────────────────────────────────────────────────────

  const login = useCallback(async (input: LoginInput): Promise<AuthUser> => {
    setIsSubmitting(true);
    try {
      const res = await authApi.login(input);
      setTokens(res.tokens.access, res.tokens.refresh);
      setUser(res.user);
      return res.user;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // ── Register ────────────────────────────────────────────────────────────────

  const register = useCallback(async (input: RegisterInput): Promise<AuthUser> => {
    setIsSubmitting(true);
    try {
      const res = await authApi.register(input);
      setTokens(res.tokens.access, res.tokens.refresh);
      setUser(res.user);
      toast.success('Welcome to Tree Sorter! Your account has been created.');
      return res.user;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // ── Logout ──────────────────────────────────────────────────────────────────

  const logout = useCallback(async (): Promise<void> => {
    setIsSubmitting(true);
    const refreshToken = getRefreshToken();
    // Always clear local state first – even if the network request fails.
    clearTokens();
    setUser(null);
    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch {
      // Ignore backend errors – the client-side state is already cleared.
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // ── Update Profile ──────────────────────────────────────────────────────────

  const updateProfile = useCallback(
    async (input: UpdateProfileInput): Promise<AuthUser> => {
      setIsSubmitting(true);
      try {
        const res = await authApi.updateCurrentUser(input);
        setUser(res.user);
        toast.success('Profile updated successfully.');
        return res.user;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // ── Change Password ─────────────────────────────────────────────────────────

  const changePassword = useCallback(
    async (input: ChangePasswordInput): Promise<void> => {
      setIsSubmitting(true);
      try {
        await authApi.changePassword(input);
        // Clear tokens – user must re-authenticate after password change.
        clearTokens();
        setUser(null);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // ── Context value ───────────────────────────────────────────────────────────

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isInitializing,
    isSubmitting,
    login,
    register,
    logout,
    refreshCurrentUser,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
