import { apiClient } from './apiClient';

export interface ProjectBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface DashboardMetricsResponse {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  reviewTasks: number;
  todoTasks: number;
  completionPercentage: number;
  
  velocity: string;
  cycleTime: string;
  throughput: string;
  teamLoad: string;
  
  activeIssues: number;
  resolved7d: number;
  avgResolution: string;
  blockers: number;
  
  weeklyData: number[];
  projectBreakdown: ProjectBreakdown[];
}

export const analyticsService = {
  getWorkspaceDashboard: async (workspaceId: string): Promise<DashboardMetricsResponse> => {
    const response = await apiClient.get<DashboardMetricsResponse>(`/analytics/workspace/${workspaceId}/dashboard`);
    return response.data;
  }
};
