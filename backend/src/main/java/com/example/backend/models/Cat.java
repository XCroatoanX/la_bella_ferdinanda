package com.example.backend.models;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Cat")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class Cat {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;
        @Setter
        private String name;
        @Setter
        private String color;
        @Setter
        private double age;
        @Setter
        private String sex;
        @Setter
        @Column(columnDefinition = "TEXT")
        private String article;
        @Setter
        private String status;
        private boolean isKitten;

        @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        @JoinTable(name = "cat_images", joinColumns = {
                        @JoinColumn(name = "cat_id")
        }, inverseJoinColumns = {
                        @JoinColumn(name = "image_id")
        })
        @Getter
        @Setter
        private List<Image> images;
}