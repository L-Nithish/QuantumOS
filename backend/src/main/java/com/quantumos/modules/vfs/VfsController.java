package com.quantumos.modules.vfs;

import com.quantumos.modules.vfs.dto.VfsNodeRequest;
import com.quantumos.modules.vfs.dto.VfsNodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/vfs")
@RequiredArgsConstructor
public class VfsController {

    private final VfsService vfsService;

    @GetMapping
    public ResponseEntity<List<VfsNodeResponse>> getNodes(
            @RequestParam(required = false) String path,
            @RequestParam(required = false, defaultValue = "false") boolean all) {
        if (all) {
            return ResponseEntity.ok(vfsService.getAllNodes());
        }
        return ResponseEntity.ok(vfsService.getNodes(path));
    }

    @PostMapping
    public ResponseEntity<VfsNodeResponse> createNode(@RequestBody VfsNodeRequest request) {
        return ResponseEntity.ok(vfsService.createNode(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VfsNodeResponse> updateNode(@PathVariable UUID id, @RequestBody VfsNodeRequest request) {
        return ResponseEntity.ok(vfsService.updateNode(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNode(@PathVariable UUID id) {
        vfsService.deleteNode(id);
        return ResponseEntity.noContent().build();
    }
}
