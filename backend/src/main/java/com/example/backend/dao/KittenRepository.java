package com.example.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Kitten;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface KittenRepository extends JpaRepository<Kitten, UUID> {
    Optional<Kitten> findById(UUID id);
    Optional<List<Kitten>> findBySex(String sex);
}