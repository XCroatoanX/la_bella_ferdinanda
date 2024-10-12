package com.example.backend.dao;

import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
import com.example.backend.models.Image;
import com.example.backend.services.ImageService;
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

        for (Cat cat : cats) {
            imageService.decompressImagesForEntity(cat.getImages());
        }

        return cats;
    }

    @Transactional
    public Cat getCatById(UUID id) {
        Optional<Cat> cat = catRepository.findById(id);

        return cat.map(value -> {
            imageService.decompressImagesForEntity(value.getImages());
            return value;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cat not found"));
    }

    public List<Cat> getCatsBySex(String sex) {
        Optional<List<Cat>> catsList = this.catRepository.findBySex(sex);

        if (catsList.isPresent()) {
            for (Cat cat : catsList.get()) {
                for (Image image : cat.getImages()) {
                    byte[] decompressedImage;
                    try {
                        decompressedImage = this.imageService.decompressImage(image.getImage());
                    } catch (IOException | DataFormatException e) {
                        throw new RuntimeException(e);
                    }
                    image.setImage(decompressedImage);
                }
            }
            return catsList.get();
        } else {
            return Collections.emptyList();
        }
    }

    @Transactional
    public void createCat(CatDTO catDTO, MultipartFile[] images) throws IOException {
        List<Image> imageList = this.imageService.imagesToByte(images);
        for (Image image : imageList) {
            byte[] compressedImage = this.imageService.compressImage(image.getImage());
            image.setImage(compressedImage);
        }

        Cat cat = new Cat(catDTO.name, catDTO.color, catDTO.age, catDTO.weight, catDTO.sex, catDTO.article, imageList);
        this.catRepository.save(cat);
    }

    public void updateCat(CatDTO catDTO, MultipartFile[] images, UUID id) throws IOException {
        Optional<Cat> cat = this.catRepository.findById(id);

        List<Image> imageList = this.imageService.imagesToByte(images);
        for (Image image : imageList) {
            byte[] compressedImage = this.imageService.compressImage(image.getImage());
            image.setImage(compressedImage);
        }

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
        this.catRepository.deleteById(id);
    }
}