/**
 * TypeScript type definitions for the authentication system.
 * These types mirror the Django API response shapes exactly.
 */

// ── User ──────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  display_name: string;
  avatar_url: string;
  location: string;
  bio: string;
  date_joined?: string;
  last_login?: string | null;
}

// ── Tokens ────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  access: string;
  refresh: string;
}

// ── API Responses ─────────────────────────────────────────────────────────────

export interface AuthResponse {
  success: boolean;
  message: string;
  user: AuthUser;
  tokens: AuthTokens;
}

export interface MeResponse {
  success: boolean;
  user: AuthUser;
}

export interface ApiSuccessResponse {
  success: boolean;
  message: string;
}

// ── Error shapes ──────────────────────────────────────────────────────────────

/** Field-level validation errors returned by Django (key → list of messages). */
export type FieldErrors = Record<string, string[]>;

export interface ApiError {
  success: false;
  message: string;
  errors?: FieldErrors;
}

// ── Form Input Types ──────────────────────────────────────────────────────────

export interface LoginInput {
  identifier: string; // username or email
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  display_name?: string;
}

export interface UpdateProfileInput {
  username?: string;
  email?: string;
  display_name?: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  uid: string;
  token: string;
  new_password: string;
  confirm_new_password: string;
}

// ── Context Value ─────────────────────────────────────────────────────────────

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True while the context is restoring session from stored tokens on mount. */
  isInitializing: boolean;
  /** True while a login / register / logout / update request is in flight. */
  isSubmitting: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshCurrentUser: () => Promise<AuthUser | null>;
  updateProfile: (input: UpdateProfileInput) => Promise<AuthUser>;
  changePassword: (input: ChangePasswordInput) => Promise<void>;
}
