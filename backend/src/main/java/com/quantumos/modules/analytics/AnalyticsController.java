package com.quantumos.modules.analytics;

import com.quantumos.modules.analytics.dto.DashboardMetricsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/workspace/{workspaceId}/dashboard")
    public ResponseEntity<DashboardMetricsResponse> getDashboardMetrics(@PathVariable UUID workspaceId) {
        return ResponseEntity.ok(analyticsService.getWorkspaceMetrics(workspaceId));
    }
}
