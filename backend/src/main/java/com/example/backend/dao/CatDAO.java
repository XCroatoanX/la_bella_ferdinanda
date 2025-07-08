package com.example.backend.dao;

import com.example.backend.dto.CatDTO;
import com.example.backend.dto.CatMinDTO;
import com.example.backend.models.Cat;
import com.example.backend.models.Image;
import com.example.backend.services.ImageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

@Component
public class CatDAO {
    private final CatRepository catRepository;
    private final ImageService imageService;

    public CatDAO(CatRepository catRepository, ImageService imageService) {
        this.catRepository = catRepository;
        this.imageService = imageService;
    }

    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    public List<CatMinDTO> getAllCatsMin() {
        List<Cat> cats = catRepository.findAll();
        List<CatMinDTO> catMinDTO = new ArrayList<>();
        for (Cat cat : cats) {
            catMinDTO.add(new CatMinDTO(
                    cat.getId(),
                    cat.getName(),
                    cat.getColor(),
                    cat.getAge(),
                    cat.getSex(),
                    cat.getArticle(),
                    cat.getStatus(),
                    cat.isKitten(),
                    cat.getImages().getFirst()));
        }
        return catMinDTO;
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

    @Transactional
    public List<Cat> getCatsBySex(String sex) {
        return this.catRepository.findBySexIgnoreCase(sex)
                .orElse(Collections.emptyList());
    }

    @Transactional
    public List<CatMinDTO> getCatsBySexMin(String sex) {
        List<Cat> cats = this.catRepository.findBySexIgnoreCase(sex)
                .orElse(Collections.emptyList());
        List<CatMinDTO> catMinDTO = new ArrayList<>();
        for (Cat cat : cats) {
            catMinDTO.add(new CatMinDTO(
                    cat.getId(),
                    cat.getName(),
                    cat.getColor(),
                    cat.getAge(),
                    cat.getSex(),
                    cat.getArticle(),
                    cat.getStatus(),
                    cat.isKitten(),
                    cat.getImages().getFirst()));
        }
        return catMinDTO;
    }

    @Transactional
    public void createCat(CatDTO catDTO, MultipartFile[] images) throws IOException {
        List<Image> imageList = this.imageService.imagesToByte(images);

        Cat cat = new Cat();
        cat.setName(catDTO.name);
        cat.setColor(catDTO.color);
        cat.setAge(catDTO.age);
        cat.setSex(catDTO.sex);
        cat.setArticle(catDTO.article);
        cat.setStatus(catDTO.status);
        cat.setKitten(false);
        cat.setImages(imageList);
        this.catRepository.save(cat);
    }

    public void updateCat(CatDTO catDTO, MultipartFile[] images, UUID id) throws IOException {
        Optional<Cat> cat = this.catRepository.findById(id);

        List<Image> imageList = this.imageService.imagesToByte(images);
        if (cat.isPresent()) {
            cat.get().setName(catDTO.name);
            cat.get().setColor(catDTO.color);
            cat.get().setAge(catDTO.age);
            cat.get().setSex(catDTO.sex);
            cat.get().setArticle(catDTO.article);
            cat.get().setStatus(catDTO.status);
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