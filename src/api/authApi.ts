/**
 * Typed methods for all authentication API endpoints.
 * Never hardcode endpoint paths outside this module.
 */

import { api } from './apiClient';
import type {
  ApiSuccessResponse,
  AuthResponse,
  ChangePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  MeResponse,
  RegisterInput,
  ResetPasswordInput,
  UpdateProfileInput,
} from '@/auth/authTypes';

const BASE = '/auth';

export const authApi = {
  register: (data: RegisterInput) =>
    api.post<AuthResponse>(`${BASE}/register/`, data, { public: true }),

  login: (data: LoginInput) =>
    api.post<AuthResponse>(`${BASE}/login/`, data, { public: true }),

  refreshToken: (refresh: string) =>
    api.post<{ access: string; refresh?: string }>(
      `${BASE}/token/refresh/`,
      { refresh },
      { public: true }
    ),

  logout: (refresh: string) =>
    api.post<ApiSuccessResponse>(`${BASE}/logout/`, { refresh }),

  getCurrentUser: () =>
    api.get<MeResponse>(`${BASE}/me/`),

  updateCurrentUser: (data: UpdateProfileInput) =>
    api.patch<{ success: boolean; message: string; user: MeResponse['user'] }>(
      `${BASE}/me/`,
      data
    ),

  changePassword: (data: ChangePasswordInput) =>
    api.post<ApiSuccessResponse>(`${BASE}/change-password/`, data),

  forgotPassword: (data: ForgotPasswordInput) =>
    api.post<ApiSuccessResponse>(`${BASE}/forgot-password/`, data, { public: true }),

  resetPassword: (data: ResetPasswordInput) =>
    api.post<ApiSuccessResponse>(`${BASE}/reset-password/`, data, { public: true }),
};
