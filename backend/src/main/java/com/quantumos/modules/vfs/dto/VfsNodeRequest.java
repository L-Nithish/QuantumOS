package com.quantumos.modules.vfs.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VfsNodeRequest {
    private String name;
    private String type; // 'dir' or 'file'
    private String content;
    private String path;
}
