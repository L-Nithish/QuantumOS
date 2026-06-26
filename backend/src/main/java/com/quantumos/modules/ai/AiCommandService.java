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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiCommandService {

    private final AiConversationRepository conversationRepository;
    private final AiMessageRepository messageRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

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

        String query = request.getQuery().trim();
        String lowerQuery = query.toLowerCase();
        String simulatedAiReply;
        String actionTaken = "NONE";

        if (lowerQuery.contains("create project") || lowerQuery.contains("new project") || lowerQuery.contains("add project")) {
            String projectName = "New Project";
            String projectDesc = "Created via Quantum AI Command Center.";
            
            int index = -1;
            if (lowerQuery.indexOf("create project") != -1) index = lowerQuery.indexOf("create project") + "create project".length();
            else if (lowerQuery.indexOf("new project") != -1) index = lowerQuery.indexOf("new project") + "new project".length();
            else if (lowerQuery.indexOf("add project") != -1) index = lowerQuery.indexOf("add project") + "add project".length();
            
            if (index != -1 && index < query.length()) {
                String remainder = query.substring(index).trim();
                if (remainder.toLowerCase().startsWith("named")) remainder = remainder.substring(5).trim();
                
                String[] parts = remainder.split("(?i)\\b(with description|description|desc|details|-)\\b", 2);
                if (parts.length > 0 && !parts[0].trim().isEmpty()) {
                    projectName = parts[0].trim();
                }
                if (parts.length > 1 && !parts[1].trim().isEmpty()) {
                    projectDesc = parts[1].trim();
                }
            }
            
            Project project = Project.builder()
                    .name(projectName)
                    .description(projectDesc)
                    .workspace(workspace)
                    .status(ProjectStatus.ACTIVE)
                    .progress(0)
                    .build();
            projectRepository.save(project);
            
            simulatedAiReply = "Project **" + projectName + "** has been successfully created and linked to your workspace.";
            actionTaken = "CREATE_PROJECT";
            
        } else if (lowerQuery.contains("create task") || lowerQuery.contains("create issue") || lowerQuery.contains("add task") || lowerQuery.contains("add issue")) {
            String taskTitle = "New Issue";
            String taskDesc = "Created via Quantum AI Command Center.";
            Project targetProject = null;
            
            int index = -1;
            if (lowerQuery.indexOf("create task") != -1) index = lowerQuery.indexOf("create task") + "create task".length();
            else if (lowerQuery.indexOf("create issue") != -1) index = lowerQuery.indexOf("create issue") + "create issue".length();
            else if (lowerQuery.indexOf("add task") != -1) index = lowerQuery.indexOf("add task") + "add task".length();
            else if (lowerQuery.indexOf("add issue") != -1) index = lowerQuery.indexOf("add issue") + "add issue".length();
            
            if (index != -1 && index < query.length()) {
                String remainder = query.substring(index).trim();
                String[] parts = remainder.split("(?i)\\b(for project|project|in project)\\b", 2);
                if (parts.length > 0 && !parts[0].trim().isEmpty()) {
                    taskTitle = parts[0].trim();
                }
                if (parts.length > 1 && !parts[1].trim().isEmpty()) {
                    String projName = parts[1].trim().replace("\"", "").replace("'", "");
                    targetProject = projectRepository.findAll().stream()
                            .filter(p -> p.getName().equalsIgnoreCase(projName))
                            .findFirst()
                            .orElse(null);
                }
            }
            
            if (targetProject == null) {
                targetProject = projectRepository.findAll().stream().findFirst().orElse(null);
            }
            
            if (targetProject == null) {
                targetProject = Project.builder()
                        .name("Default Project")
                        .description("Default project for tasks.")
                        .workspace(workspace)
                        .status(ProjectStatus.ACTIVE)
                        .progress(20)
                        .build();
                targetProject = projectRepository.save(targetProject);
            }
            
            Task task = Task.builder()
                    .title(taskTitle)
                    .description(taskDesc)
                    .project(targetProject)
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.MEDIUM)
                    .build();
            taskRepository.save(task);
            
            simulatedAiReply = "Issue **" + taskTitle + "** has been successfully created under the project **" + targetProject.getName() + "**.";
            actionTaken = "CREATE_TASK";
            
        } else if (lowerQuery.contains("list projects") || lowerQuery.contains("show projects")) {
            List<Project> projects = projectRepository.findAll();
            if (projects.isEmpty()) {
                simulatedAiReply = "There are currently no active projects in your workspace.";
            } else {
                StringBuilder sb = new StringBuilder("Here are the active projects in your workspace:\n\n");
                for (Project p : projects) {
                    sb.append("• **").append(p.getName()).append("**: ").append(p.getDescription() != null ? p.getDescription() : "No description").append(" (").append(p.getProgress() != null ? p.getProgress() : 0).append("% complete)\n");
                }
                simulatedAiReply = sb.toString();
            }
            actionTaken = "LIST_PROJECTS";
            
        } else if (lowerQuery.contains("list tasks") || lowerQuery.contains("show tasks") || lowerQuery.contains("what are my issues") || lowerQuery.contains("list issues") || lowerQuery.contains("show issues")) {
            List<Task> tasks = taskRepository.findAll();
            if (tasks.isEmpty()) {
                simulatedAiReply = "There are currently no active issues or tasks in your workspace.";
            } else {
                StringBuilder sb = new StringBuilder("Here are the active tasks in your workspace:\n\n");
                for (Task t : tasks) {
                    sb.append("• **[").append(t.getPriority()).append("] ").append(t.getTitle()).append("**: ").append(t.getStatus()).append("\n");
                }
                simulatedAiReply = sb.toString();
            }
            actionTaken = "LIST_TASKS";
            
        } else {
            List<Project> projects = projectRepository.findAll();
            List<Task> tasks = taskRepository.findAll();
            
            simulatedAiReply = "Hello! I am your Quantum AI workspace companion. I analyzed your environment:\n\n" +
                    "• **Workspace**: " + workspace.getName() + "\n" +
                    "• **Active Projects**: " + projects.size() + "\n" +
                    "• **Total Tasks/Issues**: " + tasks.size() + "\n\n" +
                    "You can ask me to **create project [name]**, **create task [title]**, **list projects**, or **list tasks** directly from this chat!";
        }

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
                .actionTaken(actionTaken)
                .build();
    }
}
