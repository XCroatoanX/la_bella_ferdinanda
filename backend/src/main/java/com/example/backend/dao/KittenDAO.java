package com.example.backend.dao;

import org.springframework.stereotype.Component;

@Component
public class KittenDAO {

    private final KittenRepository kittenRepository;

    public KittenDAO(KittenRepository kittenRepository) {
        this.kittenRepository = kittenRepository;
    }

}