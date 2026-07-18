import { apiClient } from './apiClient';

export interface Workspace {
  id: string;
  name: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export const workspaceService = {
  getDefaultWorkspace: async (): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>('/workspaces/default');
    return response.data;
  },

  getWorkspaceMembers: async (workspaceId: string): Promise<WorkspaceMember[]> => {
    const response = await apiClient.get<WorkspaceMember[]>(`/workspaces/${workspaceId}/members`);
    return response.data;
  },

  inviteMember: async (workspaceId: string, email: string, role: string = 'MEMBER'): Promise<WorkspaceMember> => {
    const response = await apiClient.post<WorkspaceMember>(`/workspaces/${workspaceId}/members`, { email, role });
    return response.data;
  }
};

