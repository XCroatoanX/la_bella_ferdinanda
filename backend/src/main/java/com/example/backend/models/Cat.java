package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity(name = "Cat")
@NoArgsConstructor
public class Cat {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String color;
    @Getter
    @Setter
    private String age;
    @Getter
    @Setter
    private double weight;
    @Getter
    @Setter
    private String sex;
    @Getter
    @Setter
    @Lob
    @Column(columnDefinition = "CLOB")
    private String article;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "cat_images", joinColumns = {
            @JoinColumn(name = "cat_id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    })
    @Getter
    @Setter
    private List<Image> images;

    public Cat(String name, String color, String age, double weight, String sex, String article, List<Image> images) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
        this.images = images;
    }
}
