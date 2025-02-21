package com.example.backend.dto;

import java.util.UUID;

import com.example.backend.models.Image;

public class CatMinDTO {
    public UUID id;
    public String name;
    public String color;
    public double age;
    public String sex;
    public String article;
    public String status;
    public boolean isKitten;
    public Image image;

    public CatMinDTO(UUID id, String name, String color, double age, String sex, String article, String status, boolean isKitten,
            Image image) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.age = age;
        this.sex = sex;
        this.article = article;
        this.status = status;
        this.isKitten = isKitten;
        this.image = image;
    }
}
