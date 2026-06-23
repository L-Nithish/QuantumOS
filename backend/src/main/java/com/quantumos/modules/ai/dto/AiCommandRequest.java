package com.quantumos.modules.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiCommandRequest {
    private UUID workspaceId;
    private UUID userId;
    private UUID conversationId; // Optional: null if new conversation
    private String query;
}
