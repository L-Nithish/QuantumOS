package com.quantumos.modules.billing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    Optional<Subscription> findByWorkspaceId(UUID workspaceId);
    Optional<Subscription> findByStripeSubscriptionId(String stripeSubscriptionId);
}
