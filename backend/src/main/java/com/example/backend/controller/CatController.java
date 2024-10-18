package com.example.backend.controller;

import com.example.backend.dao.CatDAO;
import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://172.30.16.1:4200", "http://192.168.1.118:4200"})
@RequestMapping("/cat")
@AllArgsConstructor
public class CatController {
    private final CatDAO catDAO;

    @GetMapping
    public ResponseEntity<List<Cat>> getAllCats() {
        return ResponseEntity.ok(this.catDAO.getAllCats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cat> getCatById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.catDAO.getCatById(id));
    }

    @GetMapping("/sex/{sex}")
    public ResponseEntity<List<Cat>> getCatsBySex(@PathVariable String sex) {
        return ResponseEntity.ok(this.catDAO.getCatsBySex(sex));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createCat(@RequestPart("cat") CatDTO catDTO,
                                       @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.catDAO.createCat(catDTO, file);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Created cat: " + catDTO.name);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating cat: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateCat(@PathVariable UUID id, @RequestPart("cat") CatDTO catDTO,
                                       @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.catDAO.updateCat(catDTO, file, id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Updated cat: " + catDTO.name);
            ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cat: " + e.getMessage());
        }


        return ResponseEntity.ok("Updated cat: " + catDTO.name);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCat(@PathVariable UUID id) {
        try {
            this.catDAO.deleteCatById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Deleted Cat: " + id);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}