package com.example.backend.dto;

public class AuthenticationDTO {
    public String username;
    public String password;

    public AuthenticationDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
