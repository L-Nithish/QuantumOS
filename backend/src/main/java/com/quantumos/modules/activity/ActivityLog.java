package com.quantumos.modules.activity;

import com.quantumos.modules.user.User;
import com.quantumos.modules.workspace.Workspace;
import com.quantumos.shared.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String action; // e.g. "CREATED_TASK", "DELETED_PROJECT"

    @Column(name = "meta_data", columnDefinition = "TEXT")
    private String metaData; // JSON representation of related data
}
