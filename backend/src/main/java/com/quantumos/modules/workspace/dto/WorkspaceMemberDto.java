package com.quantumos.modules.workspace.dto;

import com.quantumos.modules.workspace.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceMemberDto {
    private UUID id;
    private UUID userId;
    private String fullName;
    private String email;
    private String avatarUrl;
    private Role role;
}
