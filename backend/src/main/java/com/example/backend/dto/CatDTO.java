package com.example.backend.dto;

import com.example.backend.models.Image;

import java.util.Set;

public class CatDTO {
    public String name;
    public String color;
    public String age;
    public double weight;
    public String sex;
    public String article;
    public Set<Image> images;

    public CatDTO(String name, String color, String age, double weight, String sex, String article, Set<Image> images) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
        this.images = images;
    }
}
