package com.shop.backend.service;

import com.shop.backend.dto.AdminLoginRequest;
import com.shop.backend.model.Admin;
import com.shop.backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean login(AdminLoginRequest request) {

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (admin == null) {
            return false;
        }

        return passwordEncoder.matches(request.getPassword(), admin.getPassword());
    }
}