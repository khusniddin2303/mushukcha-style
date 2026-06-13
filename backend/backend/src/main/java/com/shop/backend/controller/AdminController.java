package com.shop.backend.controller;

import com.shop.backend.security.JwtService;
import com.shop.backend.service.AdminUserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminUserService adminUserService;
    private final JwtService jwtService;

    public AdminController(AdminUserService adminUserService, JwtService jwtService) {
        this.adminUserService = adminUserService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        adminUserService.validateLogin(username, password);

        String token = jwtService.generateToken(username);

        return Map.of("token", token);
    }
}