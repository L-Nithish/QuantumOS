package com.quantumos.modules.vfs;

import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class VfsServiceTest {

    @Mock
    private VfsNodeRepository vfsNodeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private VfsService vfsService;

    @Test
    void createNode_ShouldSaveAndReturnResponse() {
        // Mock Security
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getName()).thenReturn("test@user.com");

        User user = new User();
        user.setId(UUID.randomUUID());
        when(userRepository.findByEmail("test@user.com")).thenReturn(Optional.of(user));

        VfsNodeRequest req = new VfsNodeRequest();
        req.setName("hello.txt");
        req.setPath("/hello.txt");
        req.setType("file");
        req.setContent("Hello World");

        VfsNode savedNode = new VfsNode();
        savedNode.setId(UUID.randomUUID());
        savedNode.setName("hello.txt");
        savedNode.setPath("/hello.txt");
        savedNode.setType("file");
        savedNode.setContent("Hello World");

        when(vfsNodeRepository.save(any(VfsNode.class))).thenReturn(savedNode);

        VfsNodeResponse res = vfsService.createNode(req);

        assertEquals("hello.txt", res.getName());
        assertEquals("Hello World", res.getContent());
        verify(vfsNodeRepository, times(1)).save(any(VfsNode.class));
    }
}
