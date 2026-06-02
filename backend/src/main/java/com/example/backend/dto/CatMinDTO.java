package com.example.backend.dto;

import java.util.UUID;

import com.example.backend.models.Image;

public record CatMinDTO(UUID id, String name, String color, double age, String sex, String article, String status,
        boolean isKitten, Image image) {
}
