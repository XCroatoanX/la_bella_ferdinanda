package com.example.backend.dto;

import com.example.backend.models.Image;

public class CatMinDTO {
    public String name;
    public String color;
    public double age;
    public String sex;
    public String article;
    public String status;
    public boolean isKitten;
    public Image image;

    public CatMinDTO(String name, String color, double age, String sex, String article, String status, boolean isKitten,
            Image image) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.article = article;
        this.status = status;
        this.isKitten = isKitten;
        this.image = image;
    }
}
