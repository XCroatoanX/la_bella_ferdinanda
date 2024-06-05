package com.example.backend.controller;

import com.example.backend.dao.CatDAO;
import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
import com.example.backend.models.Image;
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
@RequestMapping("/cat")
public class CatController {
    private final ImageService imageService;
    private final CatDAO catDAO;

    public CatController(ImageService imageService, CatDAO catDAO) {
        this.imageService = imageService;
        this.catDAO = catDAO;
    }

    @GetMapping
    public ResponseEntity<List<Cat>> getAllCats() {
        return ResponseEntity.ok(this.catDAO.getAllCats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cat> getCatById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.catDAO.getCatById(id));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createCat(@RequestPart("cat") CatDTO catDTO,
                                            @RequestPart("imagefile")MultipartFile[] file) {


        try {
            Set<Image> images = this.imageService.uploadImage(file);
            this.catDAO.createCat(catDTO, images);
            return ResponseEntity.ok("Created cat: " + catDTO.name);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating cat: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCat(@PathVariable UUID id, @RequestBody CatDTO catDTO) {
        this.catDAO.updateCat(catDTO, id);

        return ResponseEntity.ok("Updated cat: " + catDTO.name);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCat(@PathVariable UUID id) {
        this.catDAO.deleteCatById(id);

        return ResponseEntity.ok("Deleted Cat: " + id);
    }
}
