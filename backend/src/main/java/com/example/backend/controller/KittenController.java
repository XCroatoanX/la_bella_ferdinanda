package com.example.backend.controller;

import com.example.backend.dao.KittenDAO;
import com.example.backend.dto.KittenDTO;
import com.example.backend.models.Kitten;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = { "http://localhost:4200" })
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

    @GetMapping("/{id}")
    public ResponseEntity<Kitten> getKittenById(@PathVariable UUID id) {
        return ResponseEntity.ok(this.kittenDAO.getKittenById(id));
    }

    @PostMapping
    public ResponseEntity<String> createKitten(@RequestBody KittenDTO kittenDTO) {
        this.kittenDAO.createKitten(kittenDTO);

        return ResponseEntity.ok("Created kitten: " + kittenDTO.name);
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
