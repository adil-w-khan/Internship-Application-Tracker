package com.adil.internship_tracker.controller;

import com.adil.internship_tracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@PreAuthorize("isAuthenticated()")
public class UserController {

    @Autowired
    private UserService userService;

    @DeleteMapping("/account")
    public ResponseEntity<?> deleteAccount(@RequestBody Map<String, String> request) {
        try {
            String password = request.get("password");

            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("{\"error\": \"Password is required\"}");
            }

            userService.deleteAccount(password);

            return ResponseEntity.ok("{\"message\": \"Account deleted successfully\"}");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            System.err.println("Unexpected error during account deletion: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body("{\"error\": \"An unexpected error occurred. Please try again.\"}");
        }
    }

    @GetMapping("/export")
    public ResponseEntity<?> exportUserData() {
        try {
            Map<String, Object> userData = userService.exportUserData();
            return ResponseEntity.ok(userData);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            System.err.println("Unexpected error during data export: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body("{\"error\": \"An unexpected error occurred. Please try again.\"}");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            // This could be useful for getting basic user info
            Map<String, Object> profile = userService.exportUserData();

            // Return only basic profile info (not full export)
            Map<String, Object> basicProfile = Map.of(
                    "user", profile.get("user"),
                    "statistics", profile.get("statistics")
            );

            return ResponseEntity.ok(basicProfile);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("{\"error\": \"Failed to load profile\"}");
        }
    }
}
