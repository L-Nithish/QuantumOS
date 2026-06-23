package com.quantumos.modules.project;

import com.quantumos.modules.project.dto.ProjectRequest;
import com.quantumos.modules.workspace.Workspace;
import com.quantumos.modules.workspace.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final WorkspaceRepository workspaceRepository; // Note: Need to create this interface soon

    @Transactional
    public Project createProject(ProjectRequest request) {
        // TODO: Implement RBAC - ensure current user is part of the workspace
        Workspace workspace = workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .workspace(workspace)
                .status(ProjectStatus.ACTIVE)
                .build();

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByWorkspace(UUID workspaceId) {
        return projectRepository.findByWorkspaceId(workspaceId);
    }

    @Transactional
    public Project archiveProject(UUID projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
        project.setStatus(ProjectStatus.ARCHIVED);
        return projectRepository.save(project);
    }
}
