package com.quantumos.modules.ai;

import com.quantumos.modules.ai.dto.AiCommandRequest;
import com.quantumos.modules.ai.dto.AiCommandResponse;
import com.quantumos.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quantumos.security.CustomUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiCommandController {

    private final AiCommandService aiCommandService;

    @PostMapping("/command")
    public ResponseEntity<AiCommandResponse> processCommand(
            @RequestBody AiCommandRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            User user = userDetails != null ? userDetails.getUser() : null;
            return ResponseEntity.ok(aiCommandService.processCommand(request, user));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
