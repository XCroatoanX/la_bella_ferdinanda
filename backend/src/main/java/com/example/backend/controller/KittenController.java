package com.example.backend.controller;

import com.example.backend.dao.KittenDAO;
import com.example.backend.dto.KittenDTO;
import com.example.backend.models.Image;
import com.example.backend.models.Kitten;
import com.example.backend.services.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = { "http://localhost:4200" })
@RequestMapping("/kitten")
public class KittenController {
    private final KittenDAO kittenDAO;
    private final ImageService imageService;

    public KittenController(KittenDAO kittenDAO, ImageService imageService) {
        this.kittenDAO = kittenDAO;
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<Kitten>> getAllKittens() {
        return ResponseEntity.ok(this.kittenDAO.getAllKittens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kitten> getKittenById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.kittenDAO.getKittenById(id));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createKitten(@RequestPart("kitten") KittenDTO kittenDTO, @RequestPart("imagefile")MultipartFile[] file) {
        try {
            Set<Image> images = this.imageService.uploadImage(file);
            this.kittenDAO.createKitten(kittenDTO, images);
            return ResponseEntity.ok("Created kitten: " + kittenDTO.name);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating kitten: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateKitten(@PathVariable UUID id, @RequestBody KittenDTO kittenDTO) {
        this.kittenDAO.updateKitten(kittenDTO, id);

        return ResponseEntity.ok("Updated kitten: " + kittenDTO.name);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteKitten(@PathVariable UUID id) {
        this.kittenDAO.deleteKittenById(id);

        return ResponseEntity.ok("Deleted Kitten: " + id);
    }
}
