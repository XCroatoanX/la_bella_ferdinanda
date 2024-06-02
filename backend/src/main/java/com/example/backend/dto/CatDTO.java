package com.example.backend.dto;

public class CatDTO {
    public String name;
    public String color;
    public String age;
    public double weight;
    public String sex;
    public String article;

    public CatDTO(String name, String color, String age, double weight, String sex, String article) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
    }
}
