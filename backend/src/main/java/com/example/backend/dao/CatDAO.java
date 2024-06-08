package com.example.backend.dao;

import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
import com.example.backend.models.Image;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class CatDAO {

    // Initialisation
    private final CatRepository catRepository;

    public CatDAO(CatRepository catRepository) {
        this.catRepository = catRepository;
    }


    // DAO
    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    @Transactional
    public Cat getCatById(UUID id) {
        Optional<Cat> cat = catRepository.findById(id);

        if (cat.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cat not found");
        }
        return cat.get();
    }

    public List<Cat> getCatsBySex(String sex) {
        Optional<List<Cat>> catsList = this.catRepository.findBySex(sex);

        if (catsList.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Cats with this sex not found");
        }
        return catsList.get();
    }

    @Transactional
    public void createCat(CatDTO catDTO, Set<Image> images) {
        Cat cat = new Cat(catDTO.name, catDTO.color, catDTO.age, catDTO.weight, catDTO.sex, catDTO.article, images);
        this.catRepository.save(cat);
    }

    public void updateCat(CatDTO catDTO, Set<Image> newImages, UUID id) {
        Optional<Cat> cat = this.catRepository.findById(id);

        if (cat.isPresent()) {
            cat.get().setName(catDTO.name);
            cat.get().setColor(catDTO.color);
            cat.get().setAge(catDTO.age);
            cat.get().setWeight(catDTO.weight);
            cat.get().setSex(catDTO.sex);
            cat.get().setArticle(catDTO.article);
            cat.get().setImages(newImages);
            this.catRepository.save(cat.get());
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cat not found");
    }

    public void deleteCatById(UUID id) {
        this.catRepository.deleteById(id);
    }
}
