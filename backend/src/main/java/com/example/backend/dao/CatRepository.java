package com.example.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Cat;

public interface CatRepository extends JpaRepository<Cat, Long> {
    Cat findByCatName(String name);

    Optional<List<Cat>> findBySex(String sex);

}
