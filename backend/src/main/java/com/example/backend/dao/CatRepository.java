package com.example.backend.dao;

import com.example.backend.models.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CatRepository extends JpaRepository<Cat, UUID> {
    Optional<List<Cat>> findBySex(String sex);
}