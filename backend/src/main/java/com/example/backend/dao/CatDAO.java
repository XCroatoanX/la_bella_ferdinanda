package com.example.backend.dao;

import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
import com.example.backend.models.Image;
import com.example.backend.services.ImageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.zip.DataFormatException;

@Component
@RequiredArgsConstructor
public class CatDAO {
    private final CatRepository catRepository;
    private final ImageService imageService;

    public List<Cat> getAllCats() {
        List<Cat> cats = catRepository.findAll();
        return cats;
    }

    @Transactional
    public Cat getCatById(UUID id) {
        Optional<Cat> cat = catRepository.findById(id);
        if (cat.isPresent()) {
            return cat.get();
        } else {
            throw new EntityNotFoundException("Cat with ID " + id + " does not exist.");
        }
    }

    public List<Cat> getCatsBySex(String sex) {
        Optional<List<Cat>> catsList = this.catRepository.findBySex(sex);

        return catsList.orElse(Collections.emptyList());
    }

    @Transactional
    public void createCat(CatDTO catDTO, MultipartFile[] images) throws IOException {
        List<Image> imageList = this.imageService.imagesToByte(images);
        UUID catId = UUID.randomUUID();

        Cat cat = new Cat(catId, catDTO.name, catDTO.color, catDTO.age, catDTO.weight, catDTO.sex, catDTO.article, imageList);
        this.catRepository.save(cat);
    }

    public void updateCat(CatDTO catDTO, MultipartFile[] images, UUID id) throws IOException {
        Optional<Cat> cat = this.catRepository.findById(id);

        List<Image> imageList = this.imageService.imagesToByte(images);
        if (cat.isPresent()) {
            cat.get().setName(catDTO.name);
            cat.get().setColor(catDTO.color);
            cat.get().setAge(catDTO.age);
            cat.get().setWeight(catDTO.weight);
            cat.get().setSex(catDTO.sex);
            cat.get().setArticle(catDTO.article);
            cat.get().setImages(imageList);
            this.catRepository.save(cat.get());
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cat not found");
    }

    public void deleteCatById(UUID id) {
        if (!catRepository.existsById(id)) {
            throw new EntityNotFoundException("Cat with ID " + id + " does not exist.");
        }
        this.catRepository.deleteById(id);
    }
}