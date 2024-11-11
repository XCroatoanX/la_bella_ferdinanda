package com.example.backend.dto;

public class CatDTO {
    public String name;
    public String color;
    public double age;
    public String sex;
    public String article;
    public String status;

    public CatDTO(String name, String color, double age, String sex, String article, String status) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.sex = sex;
        this.article = article;
        this.status = status;
    }
}