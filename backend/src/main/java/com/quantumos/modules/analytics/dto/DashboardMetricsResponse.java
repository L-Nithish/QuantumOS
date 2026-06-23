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
}
