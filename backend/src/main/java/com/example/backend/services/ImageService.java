package com.example.backend.services;

import com.example.backend.models.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.Set;

@Service
public class ImageService {
    private final String imageDir = "src/main/resources/static/images";
    public Set<Image> uploadImage(MultipartFile[] multipartfiles) throws IOException {
        Set<Image> images = new HashSet<>();
        for (MultipartFile file: multipartfiles) {
            Image image = new Image(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    imageDir + "/" + file.getOriginalFilename()
            );
            this.saveImageToStorage(imageDir, file);
            images.add(image);
        }
        return images;
    }

    public String saveImageToStorage(String uploadDirectory, MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        Path uploadPath = Path.of(uploadDirectory);
        Path filePath = uploadPath.resolve(fileName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

}
