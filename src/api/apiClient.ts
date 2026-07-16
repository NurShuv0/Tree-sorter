/**
 * Central API client for the Tree Sorter Django REST API.
 *
 * Responsibilities:
 * - Attaches Authorization: Bearer <access-token> to authenticated requests.
 * - On 401, attempts a single token refresh then retries the original request.
 * - Shares a single refresh promise so parallel failing requests don't trigger
 *   multiple simultaneous refresh calls.
 * - Clears auth state when the refresh itself fails.
 * - Normalises error shapes so callers always get { message, errors? }.
 */

import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/auth/authStorage';

const DJANGO_API_URL = (import.meta.env.VITE_DJANGO_API_URL as string) || 'http://localhost:8000/api';

// Shared refresh promise – prevents duplicate simultaneous refresh calls.
let _refreshPromise: Promise<string> | null = null;

async function _doRefresh(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available.');

  const response = await fetch(`${DJANGO_API_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    throw new Error('Session expired. Please sign in again.');
  }

  const data = await response.json();
  const newAccess: string = data.access;
  const newRefresh: string = data.refresh ?? refreshToken;
  setTokens(newAccess, newRefresh);
  return newAccess;
}

async function refreshAccessToken(): Promise<string> {
  if (!_refreshPromise) {
    _refreshPromise = _doRefresh().finally(() => {
      _refreshPromise = null;
    });
  }
  return _refreshPromise;
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  /** When true, no Authorization header is attached. */
  public?: boolean;
  /** Set to true to skip the automatic 401-retry logic. (Used internally.) */
  _isRetry?: boolean;
}

function buildHeaders(accessToken: string | null, hasBody: boolean): HeadersInit {
  const headers: Record<string, string> = {};
  if (hasBody) headers['Content-Type'] = 'application/json';
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
  return headers;
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, public: isPublic = false, _isRetry = false } = options;

  const accessToken = isPublic ? null : getAccessToken();

  const response = await fetch(`${DJANGO_API_URL}${path}`, {
    method,
    headers: buildHeaders(accessToken, body !== undefined),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Handle 401 – attempt refresh once, then retry.
  if (response.status === 401 && !isPublic && !_isRetry) {
    try {
      const newAccessToken = await refreshAccessToken();
      const retryResponse = await fetch(`${DJANGO_API_URL}${path}`, {
        method,
        headers: buildHeaders(newAccessToken, body !== undefined),
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      return _parseResponse<T>(retryResponse);
    } catch {
      clearTokens();
      throw {
        success: false,
        message: 'Your session has expired. Please sign in again.',
      };
    }
  }

  return _parseResponse<T>(response);
}

async function _parseResponse<T>(response: Response): Promise<T> {
  // 204 No Content
  if (response.status === 204) return undefined as unknown as T;

  let data: unknown;
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      throw { success: false, message: 'An unexpected server error occurred.' };
    }
  } else {
    // Non-JSON response (HTML error page, plain text, etc.)
    const text = await response.text();
    if (!response.ok) {
      throw {
        success: false,
        message:
          response.status >= 500
            ? 'Unable to connect to the authentication service. Please try again later.'
            : `Unexpected response (HTTP ${response.status}).`,
      };
    }
    return text as unknown as T;
  }

  if (!response.ok) {
    // Throw the structured error body so callers can read .errors
    throw data;
  }

  return data as T;
}

// ── Convenience methods ───────────────────────────────────────────────────────

export const api = {
  get: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'GET' }),

  post: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(path, { ...opts, method: 'POST', body }),

  patch: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(path, { ...opts, method: 'PATCH', body }),

  delete: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'DELETE' }),
};
