package com.example.backend.controller;

import com.example.backend.dao.CatDAO;
import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
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
@CrossOrigin(origins = {"http://localhost:4200"})
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
    public ResponseEntity<String> updateCat(@PathVariable UUID id, @RequestPart("cat") CatDTO catDTO,
                                            @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.catDAO.updateCat(catDTO, file, id);
            ResponseEntity.ok("Updated cat: " + catDTO.name);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cat: " + e.getMessage());
        }


        return ResponseEntity.ok("Updated cat: " + catDTO.name);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCat(@PathVariable UUID id) {
        this.catDAO.deleteCatById(id);
        return ResponseEntity.ok("Deleted Cat: " + id);
    }
}