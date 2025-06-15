package com.adil.internship_tracker.service;

import com.adil.internship_tracker.model.InternshipApplication;
import com.adil.internship_tracker.model.User;
import com.adil.internship_tracker.repository.InternshipApplicationRepository;
import com.adil.internship_tracker.repository.PasswordResetTokenRepository;
import com.adil.internship_tracker.repository.UserRepository;
import com.adil.internship_tracker.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InternshipApplicationRepository applicationRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get current authenticated user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteAccount(String password) {
        User currentUser = getCurrentUser();

        // Verify current password
        if (!passwordEncoder.matches(password, currentUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        System.out.println("Starting account deletion for user: " + currentUser.getEmail());

        try {
            // Delete all related data first (to maintain referential integrity)

            // 1. Delete all internship applications
            List<InternshipApplication> userApplications = applicationRepository.findByUserId(currentUser.getId());
            if (!userApplications.isEmpty()) {
                applicationRepository.deleteAll(userApplications);
                System.out.println("Deleted " + userApplications.size() + " applications");
            }

            // 2. Delete all password reset tokens
            passwordResetTokenRepository.deleteByUser(currentUser);
            System.out.println("Deleted password reset tokens");

            // 3. Finally, delete the user account
            userRepository.delete(currentUser);
            System.out.println("Successfully deleted user account: " + currentUser.getEmail());

        } catch (Exception e) {
            System.err.println("Error during account deletion: " + e.getMessage());
            throw new RuntimeException("Failed to delete account. Please try again.");
        }
    }

    public Map<String, Object> exportUserData() {
        User currentUser = getCurrentUser();

        System.out.println("Exporting data for user: " + currentUser.getEmail());

        try {
            // Get all user applications
            List<InternshipApplication> applications = applicationRepository.findByUserId(currentUser.getId());

            // Convert applications to export format (without user reference to avoid circular dependency)
            List<Map<String, Object>> exportApplications = applications.stream()
                    .map(this::convertApplicationToExportFormat)
                    .collect(Collectors.toList());

            // Calculate statistics
            Map<String, Object> statistics = calculateUserStatistics(applications);

            // Build export data
            Map<String, Object> exportData = new HashMap<>();

            // User information (excluding sensitive data)
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("email", currentUser.getEmail());
            userInfo.put("accountCreated", currentUser.getCreatedAt());
            userInfo.put("totalApplications", applications.size());

            // Export metadata
            Map<String, Object> exportMetadata = new HashMap<>();
            exportMetadata.put("exportDate", LocalDateTime.now());
            exportMetadata.put("exportVersion", "1.0");
            exportMetadata.put("applicationName", "AppTrack By Adil");

            // Assemble final export
            exportData.put("metadata", exportMetadata);
            exportData.put("user", userInfo);
            exportData.put("statistics", statistics);
            exportData.put("applications", exportApplications);

            System.out.println("Successfully exported " + applications.size() + " applications");

            return exportData;

        } catch (Exception e) {
            System.err.println("Error during data export: " + e.getMessage());
            throw new RuntimeException("Failed to export data. Please try again.");
        }
    }

    private Map<String, Object> convertApplicationToExportFormat(InternshipApplication app) {
        Map<String, Object> appData = new HashMap<>();


        appData.put("companyName", app.getCompanyName());
        appData.put("positionTitle", app.getPositionTitle());
        appData.put("applicationDate", app.getApplicationDate());
        appData.put("status", app.getStatus());
        appData.put("location", app.getLocation());
        appData.put("description", app.getDescription());
        appData.put("salaryRange", app.getSalaryRange());
        appData.put("notes", app.getNotes());
        appData.put("createdAt", app.getCreatedAt());
        appData.put("updatedAt", app.getUpdatedAt());

        return appData;
    }

    private Map<String, Object> calculateUserStatistics(List<InternshipApplication> applications) {
        Map<String, Object> stats = new HashMap<>();

        // Basic counts
        stats.put("totalApplications", applications.size());

        // Status breakdown
        Map<String, Long> statusCounts = applications.stream()
                .collect(Collectors.groupingBy(
                        app -> app.getStatus().toString(),
                        Collectors.counting()
                ));
        stats.put("statusBreakdown", statusCounts);

        // Calculate specific metrics
        long appliedCount = statusCounts.getOrDefault("APPLIED", 0L);
        long phoneScreenCount = statusCounts.getOrDefault("PHONE_SCREEN", 0L);
        long interviewCount = statusCounts.getOrDefault("INTERVIEW", 0L) +
                statusCounts.getOrDefault("TECHNICAL_INTERVIEW", 0L) +
                statusCounts.getOrDefault("FINAL_INTERVIEW", 0L);
        long offerCount = statusCounts.getOrDefault("OFFER", 0L);
        long rejectedCount = statusCounts.getOrDefault("REJECTED", 0L);

        stats.put("appliedCount", appliedCount);
        stats.put("interviewCount", interviewCount + phoneScreenCount);
        stats.put("offerCount", offerCount);
        stats.put("rejectedCount", rejectedCount);

        // Calculate rates
        if (applications.size() > 0) {
            double responseRate = ((double)(interviewCount + phoneScreenCount + offerCount) / applications.size()) * 100;
            double successRate = ((double)offerCount / applications.size()) * 100;

            stats.put("responseRate", Math.round(responseRate * 100.0) / 100.0);
            stats.put("successRate", Math.round(successRate * 100.0) / 100.0);
        } else {
            stats.put("responseRate", 0.0);
            stats.put("successRate", 0.0);
        }

        // Company analysis
        Map<String, Long> companyCounts = applications.stream()
                .collect(Collectors.groupingBy(
                        InternshipApplication::getCompanyName,
                        Collectors.counting()
                ));
        stats.put("uniqueCompanies", companyCounts.size());
        stats.put("topCompanies", companyCounts);

        // Time analysis
        if (!applications.isEmpty()) {
            LocalDateTime earliestApplication = applications.stream()
                    .map(app -> app.getApplicationDate() != null ?
                            app.getApplicationDate().atStartOfDay() : app.getCreatedAt())
                    .min(LocalDateTime::compareTo)
                    .orElse(null);

            LocalDateTime latestApplication = applications.stream()
                    .map(app -> app.getApplicationDate() != null ?
                            app.getApplicationDate().atStartOfDay() : app.getCreatedAt())
                    .max(LocalDateTime::compareTo)
                    .orElse(null);

            stats.put("firstApplicationDate", earliestApplication);
            stats.put("lastApplicationDate", latestApplication);
        }

        return stats;
    }
}