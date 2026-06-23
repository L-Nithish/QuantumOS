import { apiClient } from './apiClient';

export interface Workspace {
  id: string;
  name: string;
}

export const workspaceService = {
  getDefaultWorkspace: async (): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>('/workspaces/default');
    return response.data;
  }
};
