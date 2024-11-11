package com.example.backend.utils;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.backend.dao.AdminRepository;
import com.example.backend.models.Admin;

@Component
public class Seeder {
    private final AdminRepository adminRepository;

    public Seeder(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedAdmin();
    }

    public void seedAdmin() {
        Admin admin = new Admin();
        admin.setUsername("sinyaka@gmail.com");
        admin.setPassword(new BCryptPasswordEncoder().encode("Labellaferdinanda@2024"));
        adminRepository.save(admin);

    }
}