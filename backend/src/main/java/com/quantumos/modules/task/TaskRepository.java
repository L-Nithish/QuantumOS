package com.quantumos.modules.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByProjectId(UUID projectId);
    List<Task> findByAssigneeId(UUID assigneeId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId AND t.status = :status")
    long countTasksByWorkspaceAndStatus(@Param("workspaceId") UUID workspaceId, @Param("status") TaskStatus status);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.workspace.id = :workspaceId")
    long countTotalTasksByWorkspace(@Param("workspaceId") UUID workspaceId);
}
