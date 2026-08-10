package com.quantumos.modules.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {

    private final ContactMessageRepository repository;

    @Autowired
    public ContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitContact(@RequestBody ContactMessage message) {
        ContactMessage savedMessage = repository.save(message);
        return ResponseEntity.ok(savedMessage);
    }
}
