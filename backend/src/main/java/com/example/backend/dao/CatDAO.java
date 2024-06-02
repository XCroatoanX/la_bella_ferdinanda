package com.example.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;

import jakarta.transaction.Transactional;

@Component
public class CatDAO {

    private final CatRepository catRepository;

    public CatDAO(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    public List<Cat> getCatsBySex(String sex) {
        Optional<List<Cat>> cats = this.catRepository.findBySex(sex);

        if (cats.get().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Cats with this sex not found");
        }

        return cats.get();
    }

    @Transactional
    public void createCat(Cat cat) {
        this.catRepository.save(cat);
    }

    public void updateCat(CatDTO catDTO, Long id) {
        Optional<Cat> cat = this.catRepository.findById(id);

        if (cat.isPresent()) {
            cat.get().setName(catDTO.name);
            cat.get().setColor(catDTO.color);
            cat.get().setWeight(catDTO.weight);
            cat.get().setSex(catDTO.sex);
        }
    }

    public void deleteCatById(Long id) {
        this.catRepository.deleteById(id);
    }
}
