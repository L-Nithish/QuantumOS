import { apiClient } from './apiClient';

export interface VfsNodeResponse {
  id: string;
  name: string;
  type: 'dir' | 'file';
  content?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VfsNodeRequest {
  name: string;
  type: 'dir' | 'file';
  content?: string;
  parentId?: string;
}

export const vfsService = {
  getNodes: async (parentId?: string): Promise<VfsNodeResponse[]> => {
    const url = parentId ? `/vfs?parentId=${parentId}` : '/vfs';
    const response = await apiClient.get<VfsNodeResponse[]>(url);
    return response.data;
  },

  getAllNodes: async (): Promise<VfsNodeResponse[]> => {
    const response = await apiClient.get<VfsNodeResponse[]>('/vfs?all=true');
    return response.data;
  },

  createNode: async (nodeData: VfsNodeRequest): Promise<VfsNodeResponse> => {
    const response = await apiClient.post<VfsNodeResponse>('/vfs', nodeData);
    return response.data;
  },

  updateNode: async (id: string, nodeData: Partial<VfsNodeRequest>): Promise<VfsNodeResponse> => {
    const response = await apiClient.put<VfsNodeResponse>(`/vfs/${id}`, nodeData);
    return response.data;
  },

  deleteNode: async (id: string): Promise<void> => {
    await apiClient.delete(`/vfs/${id}`);
  }
};
