package com.example.backend.services;

import com.example.backend.models.Image;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@AllArgsConstructor
public class ImageService {

    public List<Image> imagesToByte(MultipartFile[] images) throws IOException {
        List<Image> imagesList = new ArrayList<>();
        for (MultipartFile image : images) {
            Image imageEntity = new Image(image.getOriginalFilename(), image.getContentType(),
                    image.getBytes());
            imagesList.add(imageEntity);
            System.out.println("SUCCESS: Image " + image.getOriginalFilename() + " added");
        }
        return imagesList;
    }
}