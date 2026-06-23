package com.quantumos.modules.billing;

import com.quantumos.modules.workspace.Workspace;
import com.quantumos.shared.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false, unique = true)
    private Workspace workspace;

    @Column(name = "stripe_customer_id")
    private String stripeCustomerId;

    @Column(name = "stripe_subscription_id")
    private String stripeSubscriptionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "plan_tier", nullable = false)
    @Builder.Default
    private SubscriptionPlan planTier = SubscriptionPlan.FREE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private SubscriptionStatus status = SubscriptionStatus.ACTIVE;

    @Column(name = "current_period_end")
    private LocalDateTime currentPeriodEnd;
}
