package com.example.backend.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Cat;

public interface CatRepository extends JpaRepository<Cat, UUID> {
    Optional<Cat> findById(UUID id);

    Optional<List<Cat>> findBySex(String sex);

}
