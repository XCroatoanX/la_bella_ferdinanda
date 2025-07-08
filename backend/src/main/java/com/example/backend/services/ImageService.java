package com.example.backend.services;

import com.example.backend.models.Image;
import com.luciad.imageio.webp.WebPWriteParam;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ImageService {
    public List<Image> imagesToByte(MultipartFile[] images) throws IOException {
        List<Image> imagesList = new ArrayList<>();
        for (MultipartFile image : images) {
            if (!Objects.equals(image.getContentType(), "image/webp")) {
                byte[] webpBytes = this.convertToWebp(image);
                String originalFilename = image.getOriginalFilename();

                assert originalFilename != null;
                String webpFileName = originalFilename.replaceAll("\\.(jpe?g|png)$", ".webp");

                Image imageEntity = new Image(webpFileName, "image/webp",
                        webpBytes);
                imagesList.add(imageEntity);
                System.out.println("SUCCESS: Image " + image.getOriginalFilename() + " converted to WebP and added");
            } else {
                Image imageEntity = new Image(image.getOriginalFilename(), image.getContentType(),
                        image.getBytes());
                imagesList.add(imageEntity);
                System.out.println("SUCCESS: Image " + image.getOriginalFilename() + " added");
            }

        }
        return imagesList;
    }

    public byte[] convertToWebp(MultipartFile image) throws IOException {
        try {
            BufferedImage bufferedImage = ImageIO.read(image.getInputStream());

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
            ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream);
            writer.setOutput(imageOutputStream);

            // Compress image
            WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
            writeParam.setCompressionMode(WebPWriteParam.MODE_EXPLICIT);
            writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]);
            writeParam.setCompressionQuality(0.8f);

            writer.write(null, new IIOImage(bufferedImage, null, null), writeParam);

            writer.dispose();
            imageOutputStream.close();
            outputStream.close();

            return outputStream.toByteArray();

        } catch (IOException e) {
            System.err.println("ERROR: Failed to convert image to WebP: " + e.getMessage());
            throw e;
        }
    }

}