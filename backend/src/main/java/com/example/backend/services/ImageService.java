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
    public static final int BITE_SIZE = 4 * 1024;

    public void decompressImagesForEntity(List<Image> images) {
        for (Image image : images) {
            try {
                byte[] decompressedImage = decompressImage(image.getImage());
                image.setImage(decompressedImage);
            } catch (IOException | DataFormatException e) {
                throw new RuntimeException("Error decompressing image", e);
            }
        }
    }

    public List<Image> imagesToByte(MultipartFile[] images) throws IOException {
        List<Image> imagesList = new ArrayList<>();
        for (MultipartFile image : images) {
            Image imageEntity = new Image(image.getOriginalFilename(), image.getContentType(),
                    compressImage(image.getBytes()));
            imagesList.add(imageEntity);
            System.out.println("SUCCESS: Image " + image.getOriginalFilename() + " added");
        }
        return imagesList;
    }

    public byte[] compressImage(byte[] image) throws IOException {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(image);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] temp = new byte[BITE_SIZE];

        while (!deflater.finished()) {
            int count = deflater.deflate(temp);
            outputStream.write(temp, 0, count);
        }
        outputStream.close();

        return outputStream.toByteArray();
    }

    public byte[] decompressImage(byte[] image) throws IOException, DataFormatException {
        Inflater decompressor = new Inflater();
        decompressor.setInput(image);
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] temp = new byte[BITE_SIZE];

        while (!decompressor.finished()) {
            int read = decompressor.inflate(temp);
            output.write(temp, 0, read);
        }
        output.close();

        return output.toByteArray();
    }

}