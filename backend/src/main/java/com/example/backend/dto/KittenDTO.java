package com.example.backend.dto;

public class KittenDTO {
    public String name;
    public String color;
    public String age;
    public String sex;
    public String article;
    public String status;

    public KittenDTO(String name, String color, String age, String sex, String article, String status) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.sex = sex;
        this.article = article;
        this.status = status;
    }
}