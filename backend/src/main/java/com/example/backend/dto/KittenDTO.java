package com.example.backend.dto;

import com.example.backend.models.Image;

import java.util.Set;

public class KittenDTO {
    public String name;
    public String color;
    public String age;
    public double bornWeight;
    public double weight;
    public String sex;
    public String article;
    public Set<Image> images;

    public KittenDTO(String name, String age, String color, String sex, double bornWeight, double weight,
            String article, Set<Image> images) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.sex = sex;
        this.bornWeight = bornWeight;
        this.weight = weight;
        this.article = article;
        this.images = images;
    }
}