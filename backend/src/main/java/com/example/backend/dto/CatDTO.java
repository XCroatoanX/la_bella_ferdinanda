package com.example.backend.dto;

import com.example.backend.models.Image;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class CatDTO {
    public String name;
    public String color;
    public String age;
    public double weight;
    public String sex;
    public String article;
    public List<Image> images;

}
