package com.example.backend.utils;

import com.example.backend.dao.AdminRepository;
import com.example.backend.dao.CatRepository;
import com.example.backend.models.Admin;
import com.example.backend.models.Cat;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Seeder {
    private AdminRepository adminRepository;
    private CatRepository catRepository;

    public Seeder(AdminRepository adminRepository, CatRepository catRepository) {
        this.adminRepository = adminRepository;
        this.catRepository = catRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedAdmin();
        seedCats();
    }

    public void seedAdmin() {
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("testpassword"));
        adminRepository.save(admin);

    }

    public void seedCats() {
        Cat cat = new Cat();
        cat.setName("Garfield");
        cat.setColor("black");
        cat.setAge("6 years old");
        cat.setWeight(5.5);
        cat.setSex("male");
        cat.setArticle("Very kind cat, loves to walk, is very friendly");
        catRepository.save(cat);
    }
}
