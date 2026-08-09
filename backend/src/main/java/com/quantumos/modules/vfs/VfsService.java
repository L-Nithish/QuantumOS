package com.quantumos.modules.vfs;

import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import com.quantumos.modules.vfs.dto.VfsNodeRequest;
import com.quantumos.modules.vfs.dto.VfsNodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VfsService {

    private final VfsNodeRepository vfsNodeRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional(readOnly = true)
    public List<VfsNodeResponse> getNodes(String path) {
        User user = getCurrentUser();
        // Since we fetch by exact path now, returning a list might only contain one item unless we do a prefix search.
        // For now, if path is null, return all nodes for the user.
        if (path == null) {
            return getAllNodes();
        }
        VfsNode node = vfsNodeRepository.findByUserIdAndPath(user.getId(), path).orElse(null);
        if (node == null) return List.of();
        return List.of(mapToResponse(node));
    }

    @Transactional(readOnly = true)
    public List<VfsNodeResponse> getAllNodes() {
        User user = getCurrentUser();
        List<VfsNode> nodes = vfsNodeRepository.findByUserId(user.getId());
        return nodes.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public VfsNodeResponse createNode(VfsNodeRequest request) {
        User user = getCurrentUser();

        // Check if node exists to update instead of create
        VfsNode node = vfsNodeRepository.findByUserIdAndPath(user.getId(), request.getPath()).orElse(null);

        if (node == null) {
            node = VfsNode.builder()
                    .name(request.getName())
                    .type(request.getType())
                    .content(request.getContent())
                    .path(request.getPath())
                    .user(user)
                    .build();
        } else {
            node.setContent(request.getContent());
            node.setType(request.getType());
        }

        return mapToResponse(vfsNodeRepository.save(node));
    }

    @Transactional
    public VfsNodeResponse updateNode(UUID id, VfsNodeRequest request) {
        User user = getCurrentUser();
        VfsNode node = vfsNodeRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Node not found"));

        if (request.getName() != null) node.setName(request.getName());
        if (request.getContent() != null) node.setContent(request.getContent());
        if (request.getPath() != null) node.setPath(request.getPath());

        return mapToResponse(vfsNodeRepository.save(node));
    }

    @Transactional
    public void deleteNode(UUID id) {
        User user = getCurrentUser();
        vfsNodeRepository.deleteByIdAndUserId(id, user.getId());
    }

    private VfsNodeResponse mapToResponse(VfsNode node) {
        return VfsNodeResponse.builder()
                .id(node.getId())
                .name(node.getName())
                .type(node.getType())
                .content(node.getContent())
                .path(node.getPath())
                .createdAt(node.getCreatedAt())
                .updatedAt(node.getUpdatedAt())
                .build();
    }
}
