package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record CatDTO(@NotBlank String name, @NotBlank String color, @PositiveOrZero double age, @NotBlank String sex,
        @NotBlank String article, @NotBlank String status, boolean isKitten) {
}
