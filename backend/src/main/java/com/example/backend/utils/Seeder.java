package com.example.backend.utils;

import com.example.backend.dao.AdminRepository;
import com.example.backend.models.Admin;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Seeder {
    private AdminRepository adminRepository;

    public Seeder(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {

    }

    public void seedAdmin(){
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("testpassword"));
        adminRepository.save(admin);

    }
}
