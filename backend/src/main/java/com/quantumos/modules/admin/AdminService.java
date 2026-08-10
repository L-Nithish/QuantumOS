package com.quantumos.modules.admin;

import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {
    
    public List<String> getUsers() {
        return Collections.singletonList("Mock User");
    }

    public List<AuditLog> getAuditLogs() {
        return Collections.emptyList();
    }

    public Map<String, Object> getAnalytics() {
        return Collections.singletonMap("activeUsers", 100);
    }
}
