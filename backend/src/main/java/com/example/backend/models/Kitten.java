package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "Kitten")
public class Kitten {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String age;
    private String color;
    private String sex;
    private double bornWeight;
    private double weight;
    private String article;

    public Kitten() {
    }

    public Kitten(long id, String name, String age, String color, String sex, double bornWeight, double weight,
            String article) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.color = color;
        this.sex = sex;
        this.bornWeight = bornWeight;
        this.weight = weight;
        this.article = article;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

}
