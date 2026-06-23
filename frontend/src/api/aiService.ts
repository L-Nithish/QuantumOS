import { apiClient } from './apiClient';

export interface AiCommandRequest {
  workspaceId?: string;
  userId?: string;
  conversationId?: string;
  query: string;
}

export interface AiCommandResponse {
  conversationId: string;
  reply: string;
  actionTaken: string;
}

export const aiService = {
  processCommand: async (query: string, conversationId?: string): Promise<AiCommandResponse> => {
    const response = await apiClient.post<AiCommandResponse>('/ai/command', {
      query,
      conversationId
    });
    return response.data;
  }
};
