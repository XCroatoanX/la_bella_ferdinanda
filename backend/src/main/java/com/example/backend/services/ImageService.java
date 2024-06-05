package com.example.backend.services;

import com.example.backend.models.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Service
public class ImageService {
    public Set<Image> uploadImage(MultipartFile[] multipartfiles) throws IOException {
        Set<Image> images = new HashSet<>();
        for (MultipartFile file: multipartfiles) {
            Image image = new Image(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            images.add(image);
        }
        return images;
    }
}
