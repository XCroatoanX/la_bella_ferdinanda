package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity(name = "Kitten")
@NoArgsConstructor
@Getter
public class Kitten {

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
    private double bornWeight;

    @Setter
    private double weight;

    @Setter
    private String sex;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String article;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "kitten_images", joinColumns = {
            @JoinColumn(name = "kitten_id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    })
    @Setter
    private List<Image> images;

    public Kitten(UUID id, String name, String color, String age, double bornWeight, double weight, String sex,
                  String article,
                  List<Image> images) {
        this.id = id;
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