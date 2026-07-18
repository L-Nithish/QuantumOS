package com.quantumos.modules.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardMetricsResponse {
    private long totalTasks;
    private long completedTasks;
    private long inProgressTasks;
    private long reviewTasks;
    private long todoTasks;
    private double completionPercentage;

    // Analytics metrics
    private String velocity;
    private String cycleTime;
    private String throughput;
    private String teamLoad;

    // Overview metrics
    private long activeIssues;
    private long resolved7d;
    private String avgResolution;
    private long blockers;

    // Charts data
    private java.util.List<Integer> weeklyData;
    private java.util.List<ProjectBreakdown> projectBreakdown;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProjectBreakdown {
        private String name;
        private int value;
        private String color;
    }
}
