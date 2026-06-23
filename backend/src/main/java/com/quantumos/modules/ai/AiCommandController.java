package com.quantumos.modules.ai;

import com.quantumos.modules.ai.dto.AiCommandRequest;
import com.quantumos.modules.ai.dto.AiCommandResponse;
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
        return ResponseEntity.ok(aiCommandService.processCommand(request, userDetails.getUser()));
    }
}
