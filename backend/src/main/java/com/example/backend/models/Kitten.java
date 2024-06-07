package com.example.backend.models;

import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

@Entity(name = "Kitten")
public class Kitten {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String color;
    private String age;
    private double bornWeight;
    private double weight;
    private String sex;
    private String article;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "kitten_images",
            joinColumns = {
                    @JoinColumn(name = "kitten_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "image_id")
            })
    private Set<Image> images;

    public Kitten() {
    }

    public Kitten(String name, String color, String age, double bornWeight, double weight, String sex, String article, Set<Image> images) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.bornWeight = bornWeight;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
        this.images = images;
    }

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

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public double getBornWeight() {
        return bornWeight;
    }

    public void setBornWeight(double bornWeight) {
        this.bornWeight = bornWeight;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public Set<Image> getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }
}
