package com.example.backend.dao;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.KittenDTO;
import com.example.backend.models.Image;
import com.example.backend.models.Kitten;
import com.example.backend.services.ImageService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Component
public class KittenDAO {
    private final KittenRepository kittenRepository;
    private final ImageService imageService;

    public KittenDAO(KittenRepository kittenRepository, ImageService imageService) {
        this.kittenRepository = kittenRepository;
        this.imageService = imageService;
    }

    public List<Kitten> getAllKittens() {
        return kittenRepository.findAll();
    }

    @Transactional
    public Kitten getKittenById(UUID id) {
        Optional<Kitten> kitten = kittenRepository.findById(id);
        try {
            return kitten.orElseThrow(() -> new EntityNotFoundException("Kitten with ID " + id + " does not exist."));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Transactional
    public void createKitten(KittenDTO kittenDTO, MultipartFile[] images) throws IOException {
        List<Image> imageList = this.imageService.imagesToByte(images);

        UUID kittenId = UUID.randomUUID();

        Kitten kitten = new Kitten(kittenId, kittenDTO.name, kittenDTO.color, kittenDTO.age, kittenDTO.sex,
                kittenDTO.article, kittenDTO.status, true, imageList);
        this.kittenRepository.save(kitten);
    }

    public void updateKitten(KittenDTO kittenDTO, MultipartFile[] images, UUID id) throws IOException {
        Optional<Kitten> kitten = this.kittenRepository.findById(id);

        List<Image> imageList = this.imageService.imagesToByte(images);

        if (kitten.isPresent()) {
            kitten.get().setName(kittenDTO.name);
            kitten.get().setColor(kittenDTO.color);
            kitten.get().setAge(kittenDTO.age);
            kitten.get().setSex(kittenDTO.sex);
            kitten.get().setArticle(kittenDTO.article);
            kitten.get().setStatus(kittenDTO.status);
            kitten.get().setImages(imageList);
            this.kittenRepository.save(kitten.get());
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitten not found");
    }

    public void deleteKittenById(UUID id) {
        if (!kittenRepository.existsById(id)) {
            throw new EntityNotFoundException("Kitten with ID " + id + " does not exist.");
        }
        this.kittenRepository.deleteById(id);
    }
}