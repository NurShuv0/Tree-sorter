/**
 * Centralized token storage helpers.
 *
 * Current strategy: persist tokens in localStorage for development convenience
 * so that sessions survive browser refreshes.
 *
 * ⚠ SECURITY NOTE: localStorage is accessible to any JavaScript on the page.
 * For a hardened production deployment, migrate to secure, HttpOnly, SameSite
 * cookies managed by the Django backend so tokens are never exposed to JS.
 * The interface of this module is intentionally small to make that migration easy.
 */

const ACCESS_TOKEN_KEY = 'ts_access';
const REFRESH_TOKEN_KEY = 'ts_refresh';

function isValidToken(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export function getAccessToken(): string | null {
  try {
    const value = localStorage.getItem(ACCESS_TOKEN_KEY);
    return isValidToken(value) ? value : null;
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    const value = localStorage.getItem(REFRESH_TOKEN_KEY);
    return isValidToken(value) ? value : null;
  } catch {
    return null;
  }
}

export function setTokens(access: string, refresh: string): void {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  } catch {
    // Storage might be full or restricted (private browsing). Fail silently.
  }
}

export function clearTokens(): void {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Returns true when both tokens appear to be stored.
 * Does NOT validate the token signatures or expiry – use /api/auth/me/ for that.
 */
export function hasStoredSession(): boolean {
  return getAccessToken() !== null && getRefreshToken() !== null;
}
