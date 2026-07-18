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

    @Transactional
    public void upgradeToPro(UUID workspaceId, String stripeCustomerId, String stripeSubscriptionId) {
        Subscription sub = getWorkspaceSubscription(workspaceId);
        sub.setPlanTier(SubscriptionPlan.PRO);
        sub.setStripeCustomerId(stripeCustomerId);
        sub.setStripeSubscriptionId(stripeSubscriptionId);
        subscriptionRepository.save(sub);
    }
    
    @Transactional
    public void processStripeWebhook(java.util.Map<String, Object> payload) {
        // Simulated Stripe Webhook Processing
        String type = (String) payload.get("type");
        if ("checkout.session.completed".equals(type)) {
            java.util.Map<String, Object> data = (java.util.Map<String, Object>) payload.get("data");
            if (data != null) {
                java.util.Map<String, Object> object = (java.util.Map<String, Object>) data.get("object");
                if (object != null) {
                    String clientReferenceId = (String) object.get("client_reference_id");
                    String customer = (String) object.get("customer");
                    String subscription = (String) object.get("subscription");
                    
                    if (clientReferenceId != null && customer != null && subscription != null) {
                        try {
                            UUID workspaceId = UUID.fromString(clientReferenceId);
                            upgradeToPro(workspaceId, customer, subscription);
                        } catch (Exception e) {
                            // Invalid UUID or missing workspace
                        }
                    }
                }
            }
        } else if ("customer.subscription.deleted".equals(type)) {
            // Simulated downgrade
            java.util.Map<String, Object> data = (java.util.Map<String, Object>) payload.get("data");
            if (data != null) {
                java.util.Map<String, Object> object = (java.util.Map<String, Object>) data.get("object");
                if (object != null) {
                    String subscription = (String) object.get("id");
                    if (subscription != null) {
                        subscriptionRepository.findAll().stream()
                            .filter(sub -> subscription.equals(sub.getStripeSubscriptionId()))
                            .findFirst()
                            .ifPresent(sub -> {
                                sub.setPlanTier(SubscriptionPlan.FREE);
                                sub.setStripeSubscriptionId(null);
                                subscriptionRepository.save(sub);
                            });
                    }
                }
            }
        }
    }
}
