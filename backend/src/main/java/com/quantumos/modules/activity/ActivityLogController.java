package com.quantumos.modules.activity;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/activity")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    @GetMapping
    public ResponseEntity<List<ActivityLog>> getAllActivity() {
        return ResponseEntity.ok(activityLogService.getAllActivity());
    }

    @GetMapping("/workspace/{workspaceId}")
    public ResponseEntity<List<ActivityLog>> getWorkspaceActivity(@PathVariable UUID workspaceId) {
        return ResponseEntity.ok(activityLogService.getWorkspaceActivity(workspaceId));
    }
}
