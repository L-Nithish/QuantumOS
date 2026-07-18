package com.quantumos.modules.workspace;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import com.quantumos.modules.workspace.dto.WorkspaceMemberDto;
import com.quantumos.modules.workspace.dto.InviteMemberRequest;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final UserRepository userRepository;

    @GetMapping("/default")
    public ResponseEntity<Workspace> getDefaultWorkspace() {
        List<Workspace> workspaces = workspaceRepository.findAll();
        if (workspaces.isEmpty()) {
            Workspace newWorkspace = Workspace.builder()
                    .name("Personal Workspace")
                    .slug("personal-workspace")
                    .build();
            return ResponseEntity.ok(workspaceRepository.save(newWorkspace));
        }
        return ResponseEntity.ok(workspaces.get(0));
    }

    @GetMapping("/{workspaceId}/members")
    public ResponseEntity<List<WorkspaceMemberDto>> getWorkspaceMembers(@PathVariable UUID workspaceId) {
        List<WorkspaceMember> members = workspaceMemberRepository.findByWorkspaceId(workspaceId);
        List<WorkspaceMemberDto> dtos = members.stream().map(m -> WorkspaceMemberDto.builder()
                .id(m.getId())
                .userId(m.getUser().getId())
                .fullName(m.getUser().getFullName())
                .email(m.getUser().getEmail())
                .avatarUrl(m.getUser().getAvatarUrl())
                .role(m.getRole())
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{workspaceId}/members")
    public ResponseEntity<?> inviteMember(@PathVariable UUID workspaceId, @RequestBody InviteMemberRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));
                
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User with email " + request.getEmail() + " not found."));

        if (workspaceMemberRepository.findByWorkspaceIdAndUserId(workspaceId, user.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("User is already a member of this workspace.");
        }

        WorkspaceMember member = WorkspaceMember.builder()
                .workspace(workspace)
                .user(user)
                .role(request.getRole() != null ? request.getRole() : Role.MEMBER)
                .build();
                
        workspaceMemberRepository.save(member);
        
        WorkspaceMemberDto dto = WorkspaceMemberDto.builder()
                .id(member.getId())
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .role(member.getRole())
                .build();
                
        return ResponseEntity.ok(dto);
    }
}
