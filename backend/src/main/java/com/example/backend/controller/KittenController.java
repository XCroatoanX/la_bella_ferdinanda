package com.example.backend.controller;

import com.example.backend.dao.KittenDAO;
import com.example.backend.dto.KittenDTO;
import com.example.backend.models.Kitten;
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
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/kitten")
@AllArgsConstructor
public class KittenController {
    private final KittenDAO kittenDAO;

    @GetMapping
    public ResponseEntity<List<Kitten>> getAllKittens() {
        return ResponseEntity.ok(this.kittenDAO.getAllKittens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kitten> getKittenById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.kittenDAO.getKittenById(id));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createKitten(@RequestPart("kitten") KittenDTO kittenDTO, @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.kittenDAO.createKitten(kittenDTO, file);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Created kitten: " + kittenDTO.name);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating kitten: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> updateKitten(@PathVariable UUID id, @RequestPart("kitten") KittenDTO kittenDTO,
                                               @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.kittenDAO.updateKitten(kittenDTO, file, id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating kitten: " + e.getMessage());
        }

        return ResponseEntity.ok("Updated kitten: " + kittenDTO.name);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteKitten(@PathVariable UUID id) {
        try {
            this.kittenDAO.deleteKittenById(id);
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