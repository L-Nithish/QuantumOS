package com.quantumos.modules.analytics;

import com.quantumos.modules.analytics.dto.DashboardMetricsResponse;
import com.quantumos.modules.task.TaskRepository;
import com.quantumos.modules.task.TaskStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final TaskRepository taskRepository;

    public DashboardMetricsResponse getWorkspaceMetrics(UUID workspaceId) {
        long total = taskRepository.countTotalTasksByWorkspace(workspaceId);
        long completed = taskRepository.countTasksByWorkspaceAndStatus(workspaceId, TaskStatus.DONE);
        long inProgress = taskRepository.countTasksByWorkspaceAndStatus(workspaceId, TaskStatus.IN_PROGRESS);
        long review = taskRepository.countTasksByWorkspaceAndStatus(workspaceId, TaskStatus.IN_REVIEW);
        long todo = taskRepository.countTasksByWorkspaceAndStatus(workspaceId, TaskStatus.TODO);

        double percentage = total == 0 ? 0 : Math.round(((double) completed / total) * 100.0);

        return DashboardMetricsResponse.builder()
                .totalTasks(total)
                .completedTasks(completed)
                .inProgressTasks(inProgress)
                .reviewTasks(review)
                .todoTasks(todo)
                .completionPercentage(percentage)
                // New mock/computed metrics for UI
                .velocity("42 pts")
                .cycleTime("2.1d")
                .throughput(String.valueOf(completed))
                .teamLoad("78%")
                .activeIssues(total - completed)
                .resolved7d(completed)
                .avgResolution("2.1d")
                .blockers(review)
                .weeklyData(java.util.List.of(65, 72, 58, 81, 76, 89, 94))
                .projectBreakdown(java.util.List.of(
                        DashboardMetricsResponse.ProjectBreakdown.builder().name("API Gateway").value(34).color("bg-zinc-300").build(),
                        DashboardMetricsResponse.ProjectBreakdown.builder().name("Mobile App").value(28).color("bg-zinc-500").build(),
                        DashboardMetricsResponse.ProjectBreakdown.builder().name("Design System").value(22).color("bg-zinc-400").build(),
                        DashboardMetricsResponse.ProjectBreakdown.builder().name("Security").value(16).color("bg-zinc-600").build()
                ))
                .build();
    }
}
