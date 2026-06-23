package com.quantumos.modules.billing;

import com.quantumos.modules.workspace.Workspace;
import com.quantumos.modules.workspace.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final WorkspaceRepository workspaceRepository;

    @Transactional
    public Subscription createFreeSubscription(UUID workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        Subscription subscription = Subscription.builder()
                .workspace(workspace)
                .planTier(SubscriptionPlan.FREE)
                .status(SubscriptionStatus.ACTIVE)
                .build();

        return subscriptionRepository.save(subscription);
    }

    public Subscription getWorkspaceSubscription(UUID workspaceId) {
        return subscriptionRepository.findByWorkspaceId(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found for workspace"));
    }

    // TODO: Add Stripe Webhook Handlers to upgrade/cancel subscriptions
    @Transactional
    public void upgradeToPro(UUID workspaceId, String stripeCustomerId, String stripeSubscriptionId) {
        Subscription sub = getWorkspaceSubscription(workspaceId);
        sub.setPlanTier(SubscriptionPlan.PRO);
        sub.setStripeCustomerId(stripeCustomerId);
        sub.setStripeSubscriptionId(stripeSubscriptionId);
        subscriptionRepository.save(sub);
    }
}
