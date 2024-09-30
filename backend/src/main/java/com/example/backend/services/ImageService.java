package com.example.backend.services;

import com.example.backend.dao.CatDAO;
import com.example.backend.models.Cat;
import com.example.backend.models.Image;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class ImageService {
    private final CatDAO catDAO;

    public ImageService(CatDAO catDAO) {
        this.catDAO = catDAO;
    }

    public Set<Image> uploadImage(MultipartFile[] multipartfiles) throws IOException {
        Set<Image> images = new HashSet<>();
        for (MultipartFile file : multipartfiles) {
            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String imageDir = "src/main/resources/static/images";
            Image image = new Image(
                    uniqueFileName,
                    file.getContentType(),
                    imageDir + "/" + uniqueFileName
            );
            this.saveImageToStorage(imageDir, uniqueFileName, file);
            images.add(image);
        }
        return images;
    }

    public void saveImageToStorage(String uploadDirectory, String fileName, MultipartFile file) throws IOException {
        Path uploadPath = Path.of(uploadDirectory);
        Path filePath = uploadPath.resolve(fileName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    public byte[] downloadImage(String filename) throws IOException {
        String imageDir = "src/main/resources/static/images";
        Path imagePath = Path.of(imageDir, filename);

        if (!Files.exists(imagePath)) {
            throw new FileNotFoundException("Image not found: " + filename);
        }

        try (InputStream imageInputStream = Files.newInputStream(imagePath)) {
            return IOUtils.toByteArray(imageInputStream);
        }
    }


    public void deleteImages(UUID id) {
        Cat cat = this.catDAO.getCatById(id);
        Set<Image> images = cat.getImages();
        for (Image image : images) {
            Path imagePath = Path.of(image.getImageDir());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
