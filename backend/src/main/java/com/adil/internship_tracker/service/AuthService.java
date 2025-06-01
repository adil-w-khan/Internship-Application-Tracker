package com.adil.internship_tracker.service;

import com.adil.internship_tracker.dto.JwtResponse;
import com.adil.internship_tracker.dto.LoginRequest;
import com.adil.internship_tracker.dto.RegisterRequest;
import com.adil.internship_tracker.model.User;
import com.adil.internship_tracker.repository.UserRepository;
import com.adil.internship_tracker.security.JwtUtils;
import com.adil.internship_tracker.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        System.out.println("Attempting to authenticate user: " + loginRequest.getEmail());

        if (!userRepository.existsByEmail(loginRequest.getEmail())) {
            System.out.println("User not found: " + loginRequest.getEmail());
            throw new RuntimeException("User not found");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();

            return new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail());
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            throw e;
        }
    }

    public String registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create new user account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return "User registered successfully!";
    }
}
