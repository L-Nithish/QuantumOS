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
public class AiCommandResponse {
    private UUID conversationId;
    private String reply;
    private String actionTaken; // e.g., "CREATED_TASK"
}
