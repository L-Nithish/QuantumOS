package com.quantumos.modules.billing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/billing")
public class BillingController {

    @GetMapping("/plans")
    public ResponseEntity<List<Map<String, Object>>> getPlans() {
        return ResponseEntity.ok(List.of(
            Map.of("id", "basic", "name", "Basic Plan", "price", 9.99),
            Map.of("id", "pro", "name", "Pro Plan", "price", 29.99)
        ));
    }

    @GetMapping("/invoices")
    public ResponseEntity<List<Map<String, Object>>> getInvoices(@RequestParam Long userId) {
        return ResponseEntity.ok(List.of(
            Map.of("id", "INV-001", "amount", 9.99, "status", "PAID", "date", "2023-10-01"),
            Map.of("id", "INV-002", "amount", 29.99, "status", "PENDING", "date", "2023-11-01")
        ));
    }

    @GetMapping("/payment-methods")
    public ResponseEntity<List<Map<String, Object>>> getPaymentMethods(@RequestParam Long userId) {
        return ResponseEntity.ok(List.of(
            Map.of("id", "pm_1", "type", "credit_card", "last4", "4242"),
            Map.of("id", "pm_2", "type", "paypal", "email", "user@example.com")
        ));
    }
}
