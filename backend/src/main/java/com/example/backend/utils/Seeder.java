package com.example.backend.utils;

import com.example.backend.dao.AdminRepository;
import com.example.backend.models.Admin;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

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
        admin.setUsername("Artemka2004#");
        admin.setPassword(new BCryptPasswordEncoder().encode("Kyryll2006@"));
        adminRepository.save(admin);

    }
}