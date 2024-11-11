package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.config.JWTUtil;
import com.example.backend.dao.AdminRepository;
import com.example.backend.dto.AuthenticationDTO;
import com.example.backend.dto.LoginResponse;
import com.example.backend.models.Admin;
import com.example.backend.services.CredentialValidator;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = { "http://localhost:4200", "http://172.23.0.1:4200", "http://192.168.1.118:4200" })
@RequestMapping("/auth")
public class AuthController {
    private final AdminRepository adminDAO;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CredentialValidator validator;

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody AuthenticationDTO authenticationDTO) {
        if (!validator.isValidUsername(authenticationDTO.username)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No valid username provided");
        }
        if (!validator.isValidPassword(authenticationDTO.password)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No valid password provided");
        }
        Admin admin = adminDAO.findByUsername(authenticationDTO.username);

        if (admin != null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Can not register with this username");
        }
        String encodedPassword = passwordEncoder.encode(authenticationDTO.password);
        Admin registeredAdmin = new Admin(authenticationDTO.username, encodedPassword);
        adminDAO.save(registeredAdmin);
        String token = jwtUtil.generateToken(registeredAdmin.getUsername());
        LoginResponse loginResponse = new LoginResponse(registeredAdmin.getUsername(), token);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthenticationDTO authenticationDTO) {
        try {
            UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                    authenticationDTO.username,
                    authenticationDTO.password);

            authenticationManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(authenticationDTO.username);

            Admin admin = adminDAO.findByUsername(authenticationDTO.username);
            LoginResponse loginResponse = new LoginResponse(admin.getUsername(), token);

            return ResponseEntity.ok(loginResponse);

        } catch (AuthenticationException authExc) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No valid credentials");
        }
    }
}