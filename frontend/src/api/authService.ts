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
    }
    return response.data;
  },

  // Register a new user
  register: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', { email, password, fullName });
    if (response.data.accessToken) {
      localStorage.setItem('quantumos_token', response.data.accessToken);
    }
    return response.data;
  },

  // Logout by destroying the token
  logout: () => {
    localStorage.removeItem('quantumos_token');
    window.location.href = '/';
  }
};
