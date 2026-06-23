package com.quantumos.modules.workspace;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceRepository workspaceRepository;

    @GetMapping("/default")
    public ResponseEntity<Workspace> getDefaultWorkspace() {
        List<Workspace> workspaces = workspaceRepository.findAll();
        if (workspaces.isEmpty()) {
            Workspace newWorkspace = Workspace.builder()
                    .name("Personal Workspace")
                    .slug("personal-workspace")
                    .build();
            return ResponseEntity.ok(workspaceRepository.save(newWorkspace));
        }
        return ResponseEntity.ok(workspaces.get(0));
    }
}
