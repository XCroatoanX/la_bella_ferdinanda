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

import com.example.backend.dao.KittenDAO;
import com.example.backend.dto.KittenDTO;
import com.example.backend.dto.KittenMinDTO;
import com.example.backend.models.Kitten;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = { "http://localhost:4200", "https://labellaferdinanda.netlify.app",
        "https://labellaferdinanda.nl", "https://www.labellaferdinanda.nl" })
@RequestMapping("/kitten")
public class KittenController {
    private final KittenDAO kittenDAO;

    public KittenController(KittenDAO kittenDAO) {
        this.kittenDAO = kittenDAO;
    }

    @GetMapping
    public ResponseEntity<List<Kitten>> getAllKittens() {
        return ResponseEntity.ok(this.kittenDAO.getAllKittens());
    }

    @GetMapping("/min")
    public ResponseEntity<List<KittenMinDTO>> getAllKittensMin() {
        return ResponseEntity.ok(this.kittenDAO.getAllKittensMin());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kitten> getKittenById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.kittenDAO.getKittenById(id));
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> createKitten(@Valid @RequestPart("kitten") KittenDTO kittenDTO,
            @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.kittenDAO.createKitten(kittenDTO, file);
            return ResponseEntity.ok(Map.of("message", "Created kitten: " + kittenDTO.name()));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(e.getReason() == null ? "Upload validation failed" : e.getReason());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating kitten: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> updateKitten(@PathVariable UUID id, @Valid @RequestPart("kitten") KittenDTO kittenDTO,
            @RequestPart("imagefile") MultipartFile[] file) {
        try {
            this.kittenDAO.updateKitten(kittenDTO, file, id);
            return ResponseEntity.ok(Map.of("message", "Updated kitten: " + kittenDTO.name()));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(e.getReason() == null ? "Upload validation failed" : e.getReason());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating kitten: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteKitten(@PathVariable UUID id) {
        try {
            this.kittenDAO.deleteKittenById(id);
            return ResponseEntity.ok(Map.of("message", "Deleted Kitten: " + id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
