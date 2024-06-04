package com.example.backend.dto;

public class KittenDTO {
    public String name;
    public String color;
    public String age;
    public double bornWeight;
    public double weight;
    public String sex;
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

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }
}