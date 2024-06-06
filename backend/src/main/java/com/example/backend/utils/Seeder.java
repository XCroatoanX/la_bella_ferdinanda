package com.example.backend.utils;

import com.example.backend.dao.AdminRepository;
import com.example.backend.dao.CatRepository;
import com.example.backend.models.Admin;
import com.example.backend.models.Cat;

import com.example.backend.models.Image;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

@Component
public class Seeder {
    private AdminRepository adminRepository;
    private CatRepository catRepository;

    public Seeder(AdminRepository adminRepository, CatRepository catRepository) {
        this.adminRepository = adminRepository;
        this.catRepository = catRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) throws IOException {
        seedAdmin();
        seedCats();
    }

    public void seedAdmin() {
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("testpassword1!"));
        adminRepository.save(admin);

    }

    public void seedCats() throws IOException {
        Cat cat = new Cat();
        cat.setName("Garfield");
        cat.setColor("black");
        cat.setAge("6 years old");
        cat.setWeight(5.5);
        cat.setSex("male");
        cat.setArticle("Very kind cat, loves to walk, is very friendly");

        Image image = new Image();
        image.setName("garfield.jpg");
        // For Linux
        // image.setImageData(Files.readAllBytes(Paths.get("/home/artem/Pictures/Lze0RWKv_400x400.jpg")));

        // For MacOS
        image.setImageData(Files.readAllBytes(Paths.get("/Users/artemstasyuk/Pictures/IMG_20240329_172201.jpg")));

        Set<Image> images = new HashSet<>();
        images.add(image);
        cat.setImages(images);

        catRepository.save(cat);
    }
}