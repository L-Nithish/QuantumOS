package com.quantumos.modules.task;

import com.quantumos.modules.project.Project;
import com.quantumos.modules.project.ProjectRepository;
import com.quantumos.modules.task.dto.TaskRequest;
import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public Task createTask(TaskRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        User assignee = null;
        if (request.getAssigneeId() != null) {
            assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new IllegalArgumentException("Assignee not found"));
        }

        Task task = Task.builder()
                .project(project)
                .assignee(assignee)
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority() != null ? request.getPriority() : TaskPriority.MEDIUM)
                .status(TaskStatus.TODO)
                .dueDate(request.getDueDate())
                .build();

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByProject(UUID projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Transactional
    public Task updateTaskStatus(UUID taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }
}
