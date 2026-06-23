import { apiClient } from './apiClient';

export interface ActivityLog {
  id: string;
  action: string;
  metaData: string;
  createdAt: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export const activityService = {
  getAllActivity: async (): Promise<ActivityLog[]> => {
    const response = await apiClient.get<ActivityLog[]>('/activity');
    return response.data;
  },
  
  getWorkspaceActivity: async (workspaceId: string): Promise<ActivityLog[]> => {
    const response = await apiClient.get<ActivityLog[]>(`/activity/workspace/${workspaceId}`);
    return response.data;
  }
};
