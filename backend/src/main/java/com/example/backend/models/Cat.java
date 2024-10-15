package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity(name = "Cat")
@NoArgsConstructor
@Getter
public class Cat {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Setter
    private String name;
    @Setter
    private String color;
    @Setter
    private String age;
    @Setter
    private double weight;
    @Setter
    private String sex;
    @Setter
    @Column(columnDefinition = "TEXT")
    private String article;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "cat_images", joinColumns = {
            @JoinColumn(name = "cat_id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    })
    @Getter
    @Setter
    private List<Image> images;

    public Cat(UUID id, String name, String color, String age, double weight, String sex, String article, List<Image> images) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
        this.images = images;
    }
}