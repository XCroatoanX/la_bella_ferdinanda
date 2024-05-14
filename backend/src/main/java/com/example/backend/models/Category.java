package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Category {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

//    @OneToMany(mappedBy = "category")
//    @JsonManagedReference
//    private Set<Cat> cats;
//    Still need to know what the cats will have
}
