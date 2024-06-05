package com.example.backend.models;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;

@Entity(name = "Cat")
public class Cat {

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
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "cat_images",
    joinColumns = {
            @JoinColumn(name = "cat_id")
    },
    inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    })
    private Set<Image> images;

    // Constructor
    public Cat() {
    }

    public Cat(String name, String color, String age, double weight, String sex, String article, Set<Image> images) {
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

    public Set<Image> getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }
}
