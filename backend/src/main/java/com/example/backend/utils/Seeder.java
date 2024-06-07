package com.example.backend.utils;

import com.example.backend.dao.AdminRepository;
import com.example.backend.dao.CatRepository;
import com.example.backend.models.Admin;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class Seeder {
    private final AdminRepository adminRepository;
    private final CatRepository catRepository;

    public Seeder(AdminRepository adminRepository, CatRepository catRepository) {
        this.adminRepository = adminRepository;
        this.catRepository = catRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) throws IOException {
        seedAdmin();
    }

    public void seedAdmin() {
        Admin admin = new Admin();
        admin.setUsername("Artemka2004#");
        admin.setPassword(new BCryptPasswordEncoder().encode("Kyryll2006@"));
        adminRepository.save(admin);

    }
}