import { apiClient } from './apiClient';

export interface UserProfileDto {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export const userService = {
  getCurrentUser: async (): Promise<UserProfileDto> => {
    const response = await apiClient.get<UserProfileDto>('/users/me');
    return response.data;
  },
  
  updateCurrentUser: async (data: Partial<UserProfileDto>): Promise<UserProfileDto> => {
    const response = await apiClient.put<UserProfileDto>('/users/me', data);
    return response.data;
  }
};
