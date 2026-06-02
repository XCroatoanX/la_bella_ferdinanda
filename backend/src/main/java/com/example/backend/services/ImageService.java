package com.example.backend.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.models.Image;
import com.luciad.imageio.webp.WebPWriteParam;

@Service
public class ImageService {
    private static final Logger log = LoggerFactory.getLogger(ImageService.class);
    private static final long MAX_SINGLE_FILE_SIZE_BYTES = 15L * 1024 * 1024;
    private static final long MAX_TOTAL_FILE_SIZE_BYTES = 250L * 1024 * 1024;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of("image/jpeg", "image/png", "image/webp");
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(".jpg", ".jpeg", ".png", ".webp");
    private static final Map<String, Set<String>> EXTENSIONS_BY_CONTENT_TYPE = Map.of(
            "image/jpeg", Set.of(".jpg", ".jpeg"),
            "image/png", Set.of(".png"),
            "image/webp", Set.of(".webp"));

    public List<Image> imagesToByte(MultipartFile[] images) throws IOException {
        validateUploadedImages(images);

        List<Image> imagesList = new ArrayList<>();
        for (MultipartFile image : images) {
            if (!Objects.equals(image.getContentType(), "image/webp")) {
                byte[] webpBytes = this.convertToWebp(image);
                String originalFilename = image.getOriginalFilename();

                String webpFileName = originalFilename == null
                        ? "image.webp"
                        : originalFilename.replaceAll("(?i)\\.(jpe?g|png)$", ".webp");

                Image imageEntity = new Image(webpFileName, "image/webp",
                        webpBytes);
                imagesList.add(imageEntity);
                log.info("Converted image {} to WebP", image.getOriginalFilename());
            } else {
                Image imageEntity = new Image(image.getOriginalFilename(), image.getContentType(),
                        image.getBytes());
                imagesList.add(imageEntity);
                log.info("Added image {}", image.getOriginalFilename());
            }

        }
        return imagesList;
    }

    private void validateUploadedImages(MultipartFile[] images) {
        if (images == null || images.length == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one image is required");
        }

        long totalSize = 0L;
        for (MultipartFile image : images) {
            if (image == null || image.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty image upload is not allowed");
            }

            if (image.getSize() > MAX_SINGLE_FILE_SIZE_BYTES) {
                throw new ResponseStatusException(HttpStatus.CONTENT_TOO_LARGE,
                        "Each image must be 15MB or smaller");
            }

            totalSize += image.getSize();
            if (totalSize > MAX_TOTAL_FILE_SIZE_BYTES) {
                throw new ResponseStatusException(HttpStatus.CONTENT_TOO_LARGE,
                        "Total upload size must be 250MB or smaller");
            }

            validateFilenameAndType(image);
            validateFileSignature(image);
        }
    }

    private void validateFilenameAndType(MultipartFile image) {
        String fileName = image.getOriginalFilename();
        if (fileName == null || fileName.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File name is required");
        }

        if (fileName.contains("..") || fileName.contains("/") || fileName.contains("\\") || fileName.contains("\0")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file name");
        }

        String extension = getExtension(fileName);
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported file extension");
        }

        String contentType = image.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase(Locale.ROOT))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported content type");
        }

        Set<String> allowedExtensionsForType = EXTENSIONS_BY_CONTENT_TYPE.get(contentType.toLowerCase(Locale.ROOT));
        if (allowedExtensionsForType == null || !allowedExtensionsForType.contains(extension)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File extension and content type do not match");
        }
    }

    private void validateFileSignature(MultipartFile image) {
        try {
            byte[] bytes = image.getBytes();
            String extension = getExtension(Objects.requireNonNull(image.getOriginalFilename()));

            boolean signatureValid = switch (extension) {
                case ".jpg", ".jpeg" -> isJpeg(bytes);
                case ".png" -> isPng(bytes);
                case ".webp" -> isWebp(bytes);
                default -> false;
            };

            if (!signatureValid) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Uploaded file content does not match the declared image format");
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to validate uploaded image", e);
        }
    }

    private String getExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        if (lastDot < 0 || lastDot == filename.length() - 1) {
            return "";
        }
        return filename.substring(lastDot).toLowerCase(Locale.ROOT);
    }

    private boolean isJpeg(byte[] bytes) {
        return bytes.length > 3
                && (bytes[0] & 0xFF) == 0xFF
                && (bytes[1] & 0xFF) == 0xD8
                && (bytes[2] & 0xFF) == 0xFF;
    }

    private boolean isPng(byte[] bytes) {
        byte[] pngMagic = new byte[] { (byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A };
        return bytes.length >= pngMagic.length && Arrays.equals(Arrays.copyOf(bytes, pngMagic.length), pngMagic);
    }

    private boolean isWebp(byte[] bytes) {
        return bytes.length >= 12
                && bytes[0] == 'R'
                && bytes[1] == 'I'
                && bytes[2] == 'F'
                && bytes[3] == 'F'
                && bytes[8] == 'W'
                && bytes[9] == 'E'
                && bytes[10] == 'B'
                && bytes[11] == 'P';
    }

    public byte[] convertToWebp(MultipartFile image) throws IOException {
        try {
            BufferedImage bufferedImage = ImageIO.read(image.getInputStream());
            if (bufferedImage == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid image content");
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
            try (ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream)) {
                writer.setOutput(imageOutputStream);

                // Compress image
                WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
                writeParam.setCompressionMode(WebPWriteParam.MODE_EXPLICIT);
                writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]);
                writeParam.setCompressionQuality(0.8f);

                writer.write(null, new IIOImage(bufferedImage, null, null), writeParam);
            } finally {
                writer.dispose();
            }

            return outputStream.toByteArray();

        } catch (IOException e) {
            log.error("Failed to convert image {} to WebP", image.getOriginalFilename(), e);
            throw e;
        }
    }

}
