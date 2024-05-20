package com.example.backend.services;

import com.example.backend.dao.AdminRepository;
import com.example.backend.models.Admin;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AdminService implements UserDetailsService {

    private final AdminRepository adminDAO;

    public AdminService(AdminRepository adminDAO) {
        this.adminDAO = adminDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin Admin = adminDAO.findByUsername(username);

        return new User(
                username,
                Admin.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
