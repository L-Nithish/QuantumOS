package com.quantumos.modules.ai;

import com.quantumos.modules.ai.dto.AiCommandRequest;
import com.quantumos.modules.ai.dto.AiCommandResponse;
import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import com.quantumos.modules.workspace.Workspace;
import com.quantumos.modules.workspace.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiCommandService {

    private final AiConversationRepository conversationRepository;
    private final AiMessageRepository messageRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    @Transactional
    public AiCommandResponse processCommand(AiCommandRequest request, User authenticatedUser) {
        User user = request.getUserId() != null ? 
                userRepository.findById(request.getUserId()).orElse(authenticatedUser) : authenticatedUser;

        Workspace workspace;
        if (request.getWorkspaceId() != null) {
            workspace = workspaceRepository.findById(request.getWorkspaceId())
                    .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));
        } else {
            workspace = workspaceRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("No workspace available"));
        }

        AiConversation conversation;
        if (request.getConversationId() != null) {
            conversation = conversationRepository.findById(request.getConversationId())
                    .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
        } else {
            // Start a new conversation
            String title = request.getQuery().length() > 30 ? request.getQuery().substring(0, 30) + "..." : request.getQuery();
            conversation = AiConversation.builder()
                    .workspace(workspace)
                    .user(user)
                    .title(title)
                    .build();
            conversation = conversationRepository.save(conversation);
        }

        // Save User Message
        AiMessage userMessage = AiMessage.builder()
                .conversation(conversation)
                .role(AiRole.USER)
                .content(request.getQuery())
                .build();
        messageRepository.save(userMessage);

        // TODO: Call LLM API (OpenAI/Anthropic) here with the conversation history and workspace context
        // For now, stub the LLM response
        String simulatedAiReply = "I have analyzed your request: '" + request.getQuery() + "'. The necessary actions have been taken in the workspace.";

        // Save AI Message
        AiMessage aiMessage = AiMessage.builder()
                .conversation(conversation)
                .role(AiRole.ASSISTANT)
                .content(simulatedAiReply)
                .build();
        messageRepository.save(aiMessage);

        return AiCommandResponse.builder()
                .conversationId(conversation.getId())
                .reply(simulatedAiReply)
                .actionTaken("NONE_STUBBED")
                .build();
    }
}
