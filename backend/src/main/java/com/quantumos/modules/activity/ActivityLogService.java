package com.quantumos.modules.activity;

import com.quantumos.modules.user.User;
import com.quantumos.modules.workspace.Workspace;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    @Transactional
    public void logActivity(Workspace workspace, User user, String action, String metaData) {
        ActivityLog log = ActivityLog.builder()
                .workspace(workspace)
                .user(user)
                .action(action)
                .metaData(metaData)
                .build();
        activityLogRepository.save(log);
    }

    public List<ActivityLog> getAllActivity() {
        return activityLogRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<ActivityLog> getWorkspaceActivity(UUID workspaceId) {
        return activityLogRepository.findByWorkspaceIdOrderByCreatedAtDesc(workspaceId);
    }
}
