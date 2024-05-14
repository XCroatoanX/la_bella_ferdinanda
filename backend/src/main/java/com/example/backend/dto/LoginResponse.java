package com.example.backend.dto;

public class LoginResponse {
    public String username;
    public String token;

    public LoginResponse(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
