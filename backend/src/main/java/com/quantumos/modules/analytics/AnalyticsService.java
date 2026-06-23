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
        long review = taskRepository.countTasksByWorkspaceAndStatus(workspaceId, TaskStatus.REVIEW);
        long todo = taskRepository.countTasksByWorkspaceAndStatus(workspaceId, TaskStatus.TODO);

        double percentage = total == 0 ? 0 : Math.round(((double) completed / total) * 100.0);

        return DashboardMetricsResponse.builder()
                .totalTasks(total)
                .completedTasks(completed)
                .inProgressTasks(inProgress)
                .reviewTasks(review)
                .todoTasks(todo)
                .completionPercentage(percentage)
                .build();
    }
}
