package com.example.backend.dto;

import com.example.backend.models.Image;

public class KittenMinDTO {
    public String name;
    public String color;
    public String age;
    public String sex;
    public String article;
    public String status;
    public Boolean isKitten;
    public String litter;
    public Image image;

    public KittenMinDTO(String name, String color, String age, String sex, String article, String status,
            Boolean isKitten, String litter, Image image) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.sex = sex;
        this.article = article;
        this.status = status;
        this.isKitten = isKitten;
        this.litter = litter;
        this.image = image;
    }
}
