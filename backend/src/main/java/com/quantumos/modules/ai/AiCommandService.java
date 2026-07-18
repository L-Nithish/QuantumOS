package com.quantumos.modules.ai;

import com.quantumos.modules.ai.dto.AiCommandRequest;
import com.quantumos.modules.ai.dto.AiCommandResponse;
import com.quantumos.modules.project.Project;
import com.quantumos.modules.project.ProjectRepository;
import com.quantumos.modules.project.ProjectStatus;
import com.quantumos.modules.task.Task;
import com.quantumos.modules.task.TaskRepository;
import com.quantumos.modules.task.TaskStatus;
import com.quantumos.modules.task.TaskPriority;
import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import com.quantumos.modules.workspace.Workspace;
import com.quantumos.modules.workspace.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.ObjectProvider;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiCommandService {

    private final AiConversationRepository conversationRepository;
    private final AiMessageRepository messageRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    
    // Use ObjectProvider so it doesn't fail context load if Ollama isn't configured
    private final ObjectProvider<ChatModel> chatModelProvider;

    public AiCommandResponse processCommand(AiCommandRequest request, User authenticatedUser) {
        User user = request.getUserId() != null ? 
                userRepository.findById(request.getUserId()).orElse(authenticatedUser) : authenticatedUser;

        Workspace workspace;
        if (request.getWorkspaceId() != null) {
            workspace = workspaceRepository.findById(request.getWorkspaceId())
                    .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));
        } else {
            workspace = workspaceRepository.findAll().stream().findFirst()
                    .orElseGet(() -> {
                        Workspace newWs = Workspace.builder()
                                .name("Default Workspace")
                                .slug("default-workspace-" + System.currentTimeMillis())
                                .build();
                        return workspaceRepository.save(newWs);
                    });
        }

        AiConversation conversation;
        if (request.getConversationId() != null) {
            conversation = conversationRepository.findById(request.getConversationId())
                    .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
        } else {
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

        String query = request.getQuery().trim();
        String lowerQuery = query.toLowerCase();
        
        List<Project> projects = projectRepository.findAll();
        List<Task> tasks = taskRepository.findAll();

        String actionTaken = "NONE";
        String aiReply = "";

        // Heuristic Action Handlers (Kept for reliable execution of OS commands without strict LLM JSON parsing)
        if (lowerQuery.startsWith("create project") || lowerQuery.startsWith("new project")) {
            String projectName = query.replaceFirst("(?i)(create project|new project)", "").trim();
            if (projectName.isEmpty()) projectName = "New AI Project";
            
            Project project = Project.builder()
                    .name(projectName)
                    .description("Created via Quantum AI Command Center.")
                    .workspace(workspace)
                    .status(ProjectStatus.ACTIVE)
                    .progress(0)
                    .build();
            projectRepository.save(project);
            
            aiReply = "Project **" + projectName + "** has been successfully created and linked to your workspace.";
            actionTaken = "CREATE_PROJECT";
            
        } else if (lowerQuery.startsWith("create task") || lowerQuery.startsWith("create issue")) {
            String taskTitle = query.replaceFirst("(?i)(create task|create issue)", "").trim();
            if (taskTitle.isEmpty()) taskTitle = "New AI Issue";
            
            Project targetProject = projects.isEmpty() ? null : projects.get(0);
            
            if (targetProject == null) {
                targetProject = Project.builder()
                        .name("Default Project")
                        .description("Default project for tasks.")
                        .workspace(workspace)
                        .status(ProjectStatus.ACTIVE)
                        .progress(0)
                        .build();
                targetProject = projectRepository.save(targetProject);
            }
            
            Task task = Task.builder()
                    .title(taskTitle)
                    .description("Created via Quantum AI Command Center.")
                    .project(targetProject)
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.MEDIUM)
                    .build();
            taskRepository.save(task);
            
            aiReply = "Issue **" + taskTitle + "** has been successfully created under the project **" + targetProject.getName() + "**.";
            actionTaken = "CREATE_TASK";
            
        } else {
            // Let the LLM handle conversational queries
            ChatModel chatModel = null;
            try {
                chatModel = chatModelProvider.getIfAvailable();
            } catch (Exception e) {
                // Bean creation failed (e.g. Ollama not running)
            }
            if (chatModel != null) {
                try {
                    String contextStr = "Workspace: " + workspace.getName() + "\n" +
                        "Active Projects: " + projects.stream().map(Project::getName).collect(Collectors.joining(", ")) + "\n" +
                        "Total Tasks: " + tasks.size();

                    String fullPrompt = "You are Quantum AI, an intelligent workspace assistant inside QuantumOS. " +
                        "Provide helpful, concise, and professional responses based on the user's workspace context.\n\n" +
                        "Context:\n" + contextStr + "\n\nUser Question:\n" + query;
                        
                    aiReply = chatModel.call(fullPrompt);
                } catch (Exception e) {
                    aiReply = "I am currently unable to reach the AI engine (Ollama may be offline). However, you can still ask me to 'create project [name]' or 'create task [title]'.";
                }
            } else {
                aiReply = "The AI model provider is not configured or available. You can still use explicit commands like 'create project [name]' or 'create task [title]'.";
            }
        }

        // Save AI Message
        AiMessage aiMessageObj = AiMessage.builder()
                .conversation(conversation)
                .role(AiRole.ASSISTANT)
                .content(aiReply)
                .build();
        messageRepository.save(aiMessageObj);

        return AiCommandResponse.builder()
                .conversationId(conversation.getId())
                .reply(aiReply)
                .actionTaken(actionTaken)
                .build();
    }
}
