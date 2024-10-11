package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "Admin")
@NoArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
  
    @Setter
    @Getter
    private String username;
    @Setter
    @Getter
    private String password;

    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
