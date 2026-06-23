import { apiClient } from './apiClient';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  workspaceId: string;
  teamName?: string;
  createdAt?: string;
}

export const projectService = {
  createProject: async (projectData: Partial<Project>): Promise<Project> => {
    const response = await apiClient.post<Project>('/projects', projectData);
    return response.data;
  },

  getAllProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  },

  getProjectsByWorkspace: async (workspaceId: string): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>(`/projects/workspace/${workspaceId}`);
    return response.data;
  },

  archiveProject: async (projectId: string): Promise<Project> => {
    const response = await apiClient.patch<Project>(`/projects/${projectId}/archive`);
    return response.data;
  }
};
