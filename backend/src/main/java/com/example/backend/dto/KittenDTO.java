package com.example.backend.dto;

public class KittenDTO {
    public String name;
    public String age;
    public String color;
    public String sex;
    public double bornWeight;
    public double weight;
    public String article;

    public KittenDTO(String name, String age, String color, String sex, double bornWeight, double weight,
            String article) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.sex = sex;
        this.bornWeight = bornWeight;
        this.weight = weight;
        this.article = article;
    }
}