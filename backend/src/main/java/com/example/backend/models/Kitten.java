package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity(name = "Kitten")
@NoArgsConstructor
public class Kitten {

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
    private double bornWeight;

    @Getter
    @Setter
    private double weight;

    @Getter
    @Setter
    private String sex;

    @Getter
    @Setter
    @Column(columnDefinition = "TEXT")
    private String article;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "kitten_images", joinColumns = {
            @JoinColumn(name = "kitten_id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    })
    @Getter
    @Setter
    private List<Image> images;

    public Kitten(String name, String color, String age, double bornWeight, double weight, String sex,
                  String article,
                  List<Image> images) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.bornWeight = bornWeight;
        this.weight = weight;
        this.sex = sex;
        this.article = article;
        this.images = images;
    }
}