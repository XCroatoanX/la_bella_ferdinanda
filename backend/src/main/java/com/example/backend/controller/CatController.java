package com.example.backend.controller;

import com.example.backend.dao.CatDAO;
import com.example.backend.dto.CatDTO;
import com.example.backend.models.Cat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = { "http://localhost:4200" })
@RequestMapping("/cat")
public class CatController {
    private final CatDAO catDAO;

    public CatController(CatDAO catDAO) {
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

    @PostMapping
    public ResponseEntity<String> createCat(@RequestBody CatDTO catDTO) {
        this.catDAO.createCat(catDTO);

        return ResponseEntity.ok("Created cat: " + catDTO.name);
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
