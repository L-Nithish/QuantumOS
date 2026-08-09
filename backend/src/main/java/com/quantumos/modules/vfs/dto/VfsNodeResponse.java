package com.quantumos.modules.vfs.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VfsNodeResponse {
    private UUID id;
    private String name;
    private String type;
    private String content;
    private String path;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
