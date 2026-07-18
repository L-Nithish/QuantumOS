package com.quantumos.modules.workspace.dto;

import com.quantumos.modules.workspace.Role;
import lombok.Data;

@Data
public class InviteMemberRequest {
    private String email;
    private Role role;
}
