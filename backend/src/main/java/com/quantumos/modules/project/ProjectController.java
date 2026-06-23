package com.quantumos.modules.project;

import com.quantumos.modules.project.dto.ProjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.createProject(request));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/workspace/{workspaceId}")
    public ResponseEntity<List<Project>> getProjectsByWorkspace(@PathVariable UUID workspaceId) {
        return ResponseEntity.ok(projectService.getProjectsByWorkspace(workspaceId));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Project> archiveProject(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.archiveProject(id));
    }
}
