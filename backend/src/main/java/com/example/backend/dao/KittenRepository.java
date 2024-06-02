package com.example.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Kitten;

@Repository
public interface KittenRepository extends JpaRepository<Kitten, Long> {
    Kitten findByKittenId(Long id);
}