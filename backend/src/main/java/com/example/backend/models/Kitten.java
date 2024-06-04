package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity(name = "Kitten")
public class Kitten {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String color;
    private String age;
    private double bornWeight;
    private double weight;
    private String sex;
    private String article;

    public Kitten() {
    }

    public Kitten(String name, String color, String age, double bornWeight, double weight, String sex, String article) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.bornWeight = bornWeight;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
