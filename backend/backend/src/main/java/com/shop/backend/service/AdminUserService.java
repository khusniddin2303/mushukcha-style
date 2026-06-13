package com.shop.backend.service;

import com.shop.backend.entity.AdminUser;
import com.shop.backend.repository.AdminUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class AdminUserService {

    private final AdminUserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminUserService(AdminUserRepository repository) {
        this.repository = repository;
    }

    // CREATE (max 3, unique username)
    public AdminUser createAdmin(String username, String rawPassword) {
        if (repository.count() >= 3) {
            throw new RuntimeException("Max 3 admin accounts allowed");
        }

        if (repository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }

        String hashed = passwordEncoder.encode(rawPassword);
        AdminUser admin = new AdminUser(username, hashed);
        return repository.save(admin);
    }

    public AdminUser getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    // LOGIN check
    public AdminUser validateLogin(String username, String rawPassword) {
        AdminUser admin = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid login"));

        if (!passwordEncoder.matches(rawPassword, admin.getPassword())) {
            throw new RuntimeException("Invalid login");
        }

        return admin;
    }

    public List<AdminUser> getAll() {
        return repository.findAll();
    }

    public void delete(Long id, String password) {
        AdminUser admin = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        repository.delete(admin);
    }

    public AdminUser updateProfile(Long id, String newUsername, String newPassword, String oldPassword) {

        AdminUser admin = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(oldPassword, admin.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (newUsername != null && !newUsername.isBlank()) {
            boolean usernameTaken = repository.existsByUsername(newUsername)
                    && !admin.getUsername().equals(newUsername);

            if (usernameTaken) {
                throw new RuntimeException("Username already exists");
            }

            admin.setUsername(newUsername);
        }

        if (newPassword != null && !newPassword.isBlank()) {
            admin.setPassword(passwordEncoder.encode(newPassword));
        }

        return repository.save(admin);
    }
    public AdminUser updateAvatar(Long id, String avatarUrl) {
        AdminUser admin = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setAvatarUrl(avatarUrl);

        return repository.save(admin);
    }
}