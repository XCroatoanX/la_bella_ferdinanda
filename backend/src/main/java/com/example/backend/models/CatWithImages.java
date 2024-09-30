package com.example.backend.models;

import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

public class CatWithImages {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String color;
    private String age;
    private double weight;
    private String sex;
    @Column(length = 20000)
    private String article;

    private Set<byte[]> images;

    // Constructor
    public CatWithImages() {
    }

    public CatWithImages(String name, String color, String age, double weight, String sex, String article, Set<byte[]> images) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
        this.images = images;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public Set<byte[]> getImages() {
        return images;
    }

    public void setImages(Set<byte[]> images) {
        this.images = images;
    }
}
