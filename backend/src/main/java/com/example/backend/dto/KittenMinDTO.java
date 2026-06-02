package com.example.backend.dto;

import java.util.UUID;

import com.example.backend.models.Image;

public record KittenMinDTO(UUID id, String name, String color, String age, String sex, String article, String status,
        Boolean isKitten, String litter, Image image) {
}
