package com.shop.backend.dto;

public class AdminUserResponse {

    private Long id;
    private String username;
    private String avatarUrl;

    public AdminUserResponse(Long id, String username, String avatarUrl) {
        this.id = id;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }
}