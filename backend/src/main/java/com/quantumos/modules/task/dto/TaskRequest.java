package com.quantumos.modules.task.dto;

import com.quantumos.modules.task.TaskPriority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    private UUID projectId;
    private UUID assigneeId; // Optional
    private String title;
    private String description;
    private TaskPriority priority;
    private LocalDateTime dueDate;
}
