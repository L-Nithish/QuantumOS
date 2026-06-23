import { apiClient } from './apiClient';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  createdAt?: string;
}

export const taskService = {
  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', taskData);
    return response.data;
  },

  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  },

  getTasksByProject: async (projectId: string): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(`/tasks/project/${projectId}`);
    return response.data;
  },

  updateTaskStatus: async (taskId: string, status: string): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${taskId}/status?status=${status}`);
    return response.data;
  }
};
