import { apiClient } from './apiClient';

export interface AuthResponse {
  accessToken: string;
  email: string;
  fullName: string;
}

export const authService = {
  // Login to the backend
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.accessToken) {
      localStorage.setItem('quantumos_token', response.data.accessToken);
      localStorage.setItem('quantumos_user_name', response.data.fullName);
      localStorage.setItem('quantumos_user_email', response.data.email);
    }
    return response.data;
  },

  // Register a new user
  register: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', { email, password, fullName });
    if (response.data.accessToken) {
      localStorage.setItem('quantumos_token', response.data.accessToken);
      localStorage.setItem('quantumos_user_name', response.data.fullName);
      localStorage.setItem('quantumos_user_email', response.data.email);
    }
    return response.data;
  },

  // Logout by destroying the token
  logout: () => {
    localStorage.removeItem('quantumos_token');
    localStorage.removeItem('quantumos_user_name');
    localStorage.removeItem('quantumos_user_email');
    window.location.href = '/';
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password });
  },

  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.post('/auth/verify-email', { token });
  }
};
