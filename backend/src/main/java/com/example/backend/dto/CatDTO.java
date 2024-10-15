package com.example.backend.dto;

import com.example.backend.models.Image;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
public class CatDTO {
    public UUID id;
    public String name;
    public String color;
    public String age;
    public double weight;
    public String sex;
    public String article;
    public List<Image> images;

}