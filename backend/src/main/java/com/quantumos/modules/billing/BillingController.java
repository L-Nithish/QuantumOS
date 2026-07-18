package com.quantumos.modules.billing;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/billing")
@RequiredArgsConstructor
public class BillingController {

    private final SubscriptionService subscriptionService;

    @GetMapping("/workspace/{workspaceId}")
    public ResponseEntity<Subscription> getWorkspaceSubscription(@PathVariable UUID workspaceId) {
        return ResponseEntity.ok(subscriptionService.getWorkspaceSubscription(workspaceId));
    }

    @org.springframework.web.bind.annotation.PostMapping("/webhook/stripe")
    public ResponseEntity<String> handleStripeWebhook(@org.springframework.web.bind.annotation.RequestBody java.util.Map<String, Object> payload) {
        subscriptionService.processStripeWebhook(payload);
        return ResponseEntity.ok("Webhook processed");
    }
}
