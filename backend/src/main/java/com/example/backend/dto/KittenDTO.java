package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record KittenDTO(@NotBlank String name, @NotBlank String color, @NotBlank String age, @NotBlank String sex,
        @NotBlank String article, @NotBlank String status, @NotNull Boolean isKitten, @NotBlank String litter) {
}
