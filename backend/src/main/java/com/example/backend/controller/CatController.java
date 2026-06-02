package com.example.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dao.CatDAO;
import com.example.backend.dto.CatDTO;
import com.example.backend.dto.CatMinDTO;
import com.example.backend.models.Cat;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = { "http://localhost:4200", "https://labellaferdinanda.netlify.app",
        "https://labellaferdinanda.nl", "https://www.labellaferdinanda.nl" })
@RequestMapping("/cat")
public class CatController {
    private final CatDAO catDAO;

    public CatController(CatDAO catDAO) {
        this.catDAO = catDAO;
    }

    @GetMapping("/sex/{sex}")
    public ResponseEntity<List<Cat>> getCatsBySex(@PathVariable String sex) {
        return ResponseEntity.ok(this.catDAO.getCatsBySex(sex));
    }

    @GetMapping("/sex/min/{sex}")
    public ResponseEntity<List<CatMinDTO>> getCatsBySexMin(@PathVariable String sex) {
        return ResponseEntity.ok(this.catDAO.getCatsBySexMin(sex));
    }

    @GetMapping
    public ResponseEntity<List<Cat>> getAllCats() {
        return ResponseEntity.ok(this.catDAO.getAllCats());
    }

    @GetMapping("/min")
    public ResponseEntity<List<CatMinDTO>> getAllCatsMin() {
        return ResponseEntity.ok(this.catDAO.getAllCatsMin());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cat> getCatById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.catDAO.getCatById(id));
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> createCat(@Valid @RequestPart("cat") CatDTO catDTO,
            @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.catDAO.createCat(catDTO, file);
            return ResponseEntity.ok(Map.of("message", "Created cat: " + catDTO.name()));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(e.getReason() == null ? "Upload validation failed" : e.getReason());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating cat: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> updateCat(@PathVariable UUID id, @Valid @RequestPart("cat") CatDTO catDTO,
            @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.catDAO.updateCat(catDTO, file, id);
            return ResponseEntity.ok(Map.of("message", "Updated cat: " + catDTO.name()));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(e.getReason() == null ? "Upload validation failed" : e.getReason());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating cat: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCat(@PathVariable UUID id) {
        try {
            this.catDAO.deleteCatById(id);
            return ResponseEntity.ok(Map.of("message", "Deleted Cat: " + id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
