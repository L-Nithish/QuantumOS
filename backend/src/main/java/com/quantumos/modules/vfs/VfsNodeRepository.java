package com.quantumos.modules.vfs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VfsNodeRepository extends JpaRepository<VfsNode, UUID> {
    
    List<VfsNode> findByUserId(UUID userId);
    
    Optional<VfsNode> findByUserIdAndPath(UUID userId, String path);
    
    Optional<VfsNode> findByIdAndUserId(UUID id, UUID userId);
    
    void deleteByIdAndUserId(UUID id, UUID userId);
}
