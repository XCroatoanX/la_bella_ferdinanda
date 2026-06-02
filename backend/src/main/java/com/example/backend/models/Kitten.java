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

@Entity
public class Kitten {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;
        private String name;
        private String color;
        private String age;
        private String sex;
        @Column(columnDefinition = "TEXT")
        private String article;
        private String status;
        private boolean isKitten;
        private String litter;

        @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinTable(name = "kitten_images", joinColumns = {
                        @JoinColumn(name = "kitten_id")
        }, inverseJoinColumns = {
                        @JoinColumn(name = "image_id")
        })
        private List<Image> images;

        public Kitten(UUID id, String name, String color, String age, String sex, String article, String status,
                        boolean isKitten, String litter, List<Image> images) {
                this.id = id;
                this.name = name;
                this.color = color;
                this.age = age;
                this.sex = sex;
                this.article = article;
                this.status = status;
                this.isKitten = isKitten;
                this.litter = litter;
                this.images = images;
        }

        protected Kitten() {
        }

        public UUID getId() {
                return id;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public String getColor() {
                return color;
        }

        public void setColor(String color) {
                this.color = color;
        }

        public String getAge() {
                return age;
        }

        public void setAge(String age) {
                this.age = age;
        }

        public String getSex() {
                return sex;
        }

        public void setSex(String sex) {
                this.sex = sex;
        }

        public String getArticle() {
                return article;
        }

        public void setArticle(String article) {
                this.article = article;
        }

        public String getStatus() {
                return status;
        }

        public void setStatus(String status) {
                this.status = status;
        }

        public boolean isKitten() {
                return isKitten;
        }

        public void setKitten(boolean kitten) {
                isKitten = kitten;
        }

        public String getLitter() {
                return litter;
        }

        public void setLitter(String litter) {
                this.litter = litter;
        }

        public List<Image> getImages() {
                return images;
        }

        public void setImages(List<Image> images) {
                this.images = images;
        }

}
