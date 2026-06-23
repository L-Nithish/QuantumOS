package com.quantumos.modules.ai;

import com.quantumos.shared.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ai_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiMessage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", nullable = false)
    private AiConversation conversation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AiRole role;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
}
