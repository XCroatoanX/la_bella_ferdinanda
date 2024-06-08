package com.example.backend.dao;

import com.example.backend.dto.KittenDTO;
import com.example.backend.models.Image;
import com.example.backend.models.Kitten;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class KittenDAO {

    // Initialisation
    private final KittenRepository kittenRepository;

    public KittenDAO(KittenRepository kittenRepository) {
        this.kittenRepository = kittenRepository;
    }


    // DAO
    public List<Kitten> getAllKittens() {
        return kittenRepository.findAll();
    }

    @Transactional
    public Kitten getKittenById(UUID kittenID) {
        Optional<Kitten> kitten = this.kittenRepository.findById(kittenID);
        if (kitten.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitten with this id not found");
        }
        return kitten.get();
    }

    @Transactional
    public void createKitten(KittenDTO kittenDTO, Set<Image> images) {
        Kitten kitten = new Kitten(kittenDTO.name, kittenDTO.color, kittenDTO.age, kittenDTO.bornWeight, kittenDTO.weight, kittenDTO.sex, kittenDTO.article, images);
        this.kittenRepository.save(kitten);
    }

    public void updateKitten(KittenDTO kittenDTO, Set<Image> newImages, UUID id) {
        Optional<Kitten> kitten = this.kittenRepository.findById(id);

        if (kitten.isPresent()) {
            kitten.get().setName(kittenDTO.name);
            kitten.get().setColor(kittenDTO.color);
            kitten.get().setAge(kittenDTO.age);
            kitten.get().setBornWeight(kittenDTO.bornWeight);
            kitten.get().setWeight(kittenDTO.weight);
            kitten.get().setSex(kittenDTO.sex);
            kitten.get().setArticle(kittenDTO.article);
            kitten.get().setImages(newImages);
            this.kittenRepository.save(kitten.get());
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitten not found");
    }

    public void deleteKittenById(UUID id) {
        this.kittenRepository.deleteById(id);
    }

}