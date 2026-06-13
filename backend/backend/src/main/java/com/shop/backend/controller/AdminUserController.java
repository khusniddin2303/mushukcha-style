package com.shop.backend.controller;

import com.shop.backend.entity.AdminUser;
import com.shop.backend.service.AdminUserService;
import org.springframework.web.bind.annotation.*;
import com.shop.backend.dto.AdminUserResponse;
import com.shop.backend.dto.AdminProfileUpdateRequest;
import com.shop.backend.dto.AdminUserResponse;
import com.shop.backend.security.JwtService;
import com.shop.backend.dto.DeleteAdminRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    private final AdminUserService service;
    private final JwtService jwtService;

    public AdminUserController(AdminUserService service, JwtService jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }

    @PostMapping
    public AdminUser create(@RequestBody Map<String, String> request) {
        return service.createAdmin(
                request.get("username"),
                request.get("password")
        );
    }

    @PutMapping("/{id}/profile")
    public AdminUserResponse updateProfile(
            @PathVariable Long id,
            @RequestBody AdminProfileUpdateRequest request
    ) {
        AdminUser admin = service.updateProfile(
                id,
                request.getNewUsername(),
                request.getNewPassword(),
                request.getOldPassword()
        );

        return new AdminUserResponse(
                admin.getId(),
                admin.getUsername(),
                admin.getAvatarUrl()
        );
    }

    @PutMapping("/{id}/avatar")
    public AdminUserResponse updateAvatar(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> request
    ) {
        AdminUser admin = service.updateAvatar(id, request.get("avatarUrl"));

        return new AdminUserResponse(
                admin.getId(),
                admin.getUsername(),
                admin.getAvatarUrl()
        );
    }

    @GetMapping("/me")
    public AdminUserResponse getCurrentAdmin(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");

        String username = jwtService.extractUsername(token);

        AdminUser admin = service.getByUsername(username);

        return new AdminUserResponse(
                admin.getId(),
                admin.getUsername(),
                admin.getAvatarUrl()
        );
    }

    @GetMapping
    public List<AdminUserResponse> getAll() {
        return service.getAll()
                .stream()
                .map(admin -> new AdminUserResponse(
                        admin.getId(),
                        admin.getUsername(),
                        admin.getAvatarUrl()
                ))
                .toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id,
            @RequestBody DeleteAdminRequest request
    ) {
        service.delete(id, request.getPassword());
        return ResponseEntity.ok().build();
    }
}